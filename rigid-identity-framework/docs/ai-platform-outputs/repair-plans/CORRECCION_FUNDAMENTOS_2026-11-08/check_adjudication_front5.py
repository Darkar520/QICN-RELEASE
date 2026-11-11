"""Exact finite controls for Paper X. Synthetic checks, not external support."""
from fractions import Fraction as F
from itertools import combinations, product
from math import comb, factorial


def binmass(n, k, q):
    return F(comb(n, k))*q**k*(1-q)**(n-k)


def cp_contains(n, k, q, alpha):
    # Exact tail inversion tests membership without rounding algebraic endpoints.
    lower = k == 0 or sum((binmass(n, j, q) for j in range(k, n+1)), F(0)) >= alpha/2
    upper = k == n or sum((binmass(n, j, q) for j in range(k+1)), F(0)) >= alpha/2
    return lower and upper


def counts(n):
    return [(a, b, n-a-b) for a in range(n+1) for b in range(n-a+1)]


def multinomial(n, c, theta):
    return F(factorial(n), factorial(c[0])*factorial(c[1])*factorial(c[2]))*product_value(
        p**k for p, k in zip(theta, c))


def product_value(values):
    result = F(1)
    for value in values:
        result *= value
    return result


def floors(c, p, gamma=F(3, 4)):
    return gamma*(1-c)+max(c-p, F(0))/2, gamma*(1-c)+max(c/2-p, F(0))


def sampling_controls():
    alpha=F(1, 5)
    cases=0
    for n, c, err in product(range(7), (F(0), F(1, 4), F(1, 2), F(1)),
                              (F(0), F(1, 3), F(1, 2), F(1))):
        theta=(c*err, c*(1-err), 1-c)
        masses={a:multinomial(n, a, theta) for a in counts(n)}
        assert sum(masses.values()) == 1
        bad_rectangle=F(0)
        bad_joint=F(0)
        for a, probability in masses.items():
            k, correct, abstain=a
            m=k+correct
            if not (cp_contains(n, m, c, alpha) and cp_contains(m, k, err, alpha)):
                bad_rectangle+=probability
            rank=sum((v for v in masses.values() if v <= probability), F(0))
            if rank <= alpha:
                bad_joint+=probability
            # Factorization at C=0/1 and M=0 remains valid, with 0**0 = 1.
            assert probability == binmass(n, m, c)*binmass(m, k, err)
        assert bad_rectangle <= 2*alpha
        assert bad_joint <= alpha
        cases+=1
    # Bilinear risk extrema lie at the four corners; rational interior grid.
    for lo, hi, elo, ehi in [(F(1, 4), F(3, 4), F(0), F(1, 3)), (F(0), F(1), F(0), F(1))]:
        risk=lambda c,e:F(3,4)*(1-c)+c*e
        corners=[risk(c,e) for c,e in product((lo,hi),(elo,ehi))]
        for i,j in product(range(9),repeat=2):
            value=risk(lo+(hi-lo)*F(i,8),elo+(ehi-elo)*F(j,8))
            assert min(corners) <= value <= max(corners)
    assert cp_contains(0,0,F(0),alpha) and cp_contains(0,0,F(1),alpha)
    print(f"Exact block inference: {cases} multinomial laws; CP union and mass-rank coverage verified")


def leakage_controls():
    for c,p in product((F(i,8) for i in range(9)),repeat=2):
        clean,coupling=floors(c,p)
        clean_errors=(c-min(c,p))/2
        coupling_errors=c/2-min(p,c/2)
        assert clean == clean_errors+F(3,4)*(1-c)
        assert coupling == coupling_errors+F(3,4)*(1-c)
        assert coupling <= clean
        for larger in (c,(c+1)/2,F(1)):
            assert floors(larger,p)[0] <= clean and floors(larger,p)[1] <= coupling
    assignments=list(combinations(range(4),2))
    errors=[2-len(set(a)&{0,1}) for a in assignments]
    assert sorted(errors)==[0,1,1,1,1,2]
    risks=[F(k,4)+F(3,8) for k in errors]
    assert sum(risks)/6 == F(5,8)
    assert F(sum(k==0 for k in errors),6)==F(1,6)
    # Eight equiprobable atoms: labels balanced; fixed cover four atoms.
    labels=(1,1,0,0,1,1,0,0)
    cover=(1,1,1,1,0,0,0,0)
    leak=(0,0,1,0,0,0,0,0)
    guesses=tuple(labels[i] if leak[i] else 1 for i in range(8))
    wrong=sum(cover[i] and guesses[i]!=labels[i] for i in range(8))
    c,p=F(sum(cover),8),F(sum(leak),8)
    risk=F(wrong,8)+F(3,4)*(1-c)
    assert (c,p,risk)==(F(1,2),F(1,8),F(1,2))
    assert floors(c,p)==(F(9,16),risk)
    # Clean conditional balance fails: leaked atom is negative.
    assert sum(labels[i] for i in range(8) if not leak[i]) == 4
    assert sum(1 for i in range(8) if not leak[i]) == 7
    print("Leakage: sharp floors, selective abstention, 6 block permutations and label-dependent counterexample verified")


def transpose(a):
    return [list(x) for x in zip(*a)]


def matmul(a,b):
    return [[sum((x*y for x,y in zip(row,col)),F(0)) for col in zip(*b)] for row in a]


def determinant(a):
    a=[row[:] for row in a]
    det=F(1)
    for j in range(len(a)):
        pivot=next(i for i in range(j,len(a)) if a[i][j])
        if pivot != j:
            a[j],a[pivot]=a[pivot],a[j]
            det=-det
        v=a[j][j]
        det*=v
        a[j]=[x/v for x in a[j]]
        for i in range(j+1,len(a)):
            v=a[i][j]
            a[i]=[x-v*y for x,y in zip(a[i],a[j])]
    return det


def precision(n,rho):
    b=[[F(i==j)-rho*F(i==j+1) for j in range(n)] for i in range(n)]
    w=[[F(i==j)*(1-rho*rho if i==0 else 1) for j in range(n)] for i in range(n)]
    return matmul(matmul(transpose(b),w),b)


def quadratic(a,x):
    return sum((x[i]*a[i][j]*x[j] for i,j in product(range(len(x)),repeat=2)),F(0))


def ar_controls():
    for n,rho in product(range(1,7),(F(0),F(1,2),F(-1,2),F(2,3),F(-2,3))):
        a=precision(n,rho)
        cov=[[rho**abs(i-j)/(1-rho*rho) for j in range(n)] for i in range(n)]
        assert matmul(a,cov)==[[F(i==j) for j in range(n)] for i in range(n)]
        assert determinant(a)==1-rho*rho
        # Sylvester: all leading minors positive; handles n=1 separately.
        assert all(determinant([row[:k] for row in a[:k]])>0 for k in range(1,n+1))
        for x in (list(map(F,range(n))),[F((-1)**i) for i in range(n)]):
            q=(1-rho*rho)*x[0]**2+sum(((x[i]-rho*x[i-1])**2 for i in range(1,n)),F(0))
            assert quadratic(a,x)==q
    rho=F(1,2)
    q=lambda x:quadratic(precision(len(x),rho),list(map(F,x)))
    assert (q([1,F(-1,2)])-q([1,1]))/2==F(3,8)
    assert (F(1)+F(1,4)-2)/2==F(-3,8)
    assert (q([0,1])-q([2,1]))/2 == -1
    assert ((F(1)-rho*0)**2-(F(1)-rho*2)**2)/2 == F(1,2)
    a=precision(3,rho)
    y=[F(1),F(0),F(1)]
    gls=sum((a[i][j]*y[j] for i,j in product(range(3),repeat=2)),F(0))/sum(map(sum,a))
    assert gls==F(4,5) and sum(y)/3==F(2,3)
    # Logical separation: observed score can vary with a non-singleton fiber,
    # and an injective projection can coexist with identical class laws.
    fibers={0:{0,1},1:{0,1}}
    assert all(max(v)-min(v)==1 for v in fibers.values())
    assert q([1,F(-1,2)]) != q([1,1])
    print("AR(1): covariance/precision/determinants, stationary likelihood reversals and GLS verified exactly")


if __name__ == '__main__':
    sampling_controls()
    leakage_controls()
    ar_controls()
    print('external_support_certified=false')
