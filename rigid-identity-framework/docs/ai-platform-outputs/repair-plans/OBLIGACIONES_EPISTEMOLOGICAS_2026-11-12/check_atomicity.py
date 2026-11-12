"""Exact finite controls; infinite claims are proved in Paper I."""
from fractions import Fraction as F
from itertools import product
square=tuple(product((F(0),F(1)),repeat=2))
clamp=lambda x:(x[0],F(0))
gap=max(min(max(abs(a-b) for a,b in zip(x,clamp(y))) for y in square) for x in square)
assert gap==1 and F(1)/gap==1
assert not (F(1)>F(1)/gap)  # Positive resistance at the threshold is still a product.
for n in range(2,11):
 words=tuple(product((0,1),repeat=n))
 split=lambda x:(x[::2],x[1::2])
 assert len({split(x) for x in words})==len(words)
 for x in words:
  a,b=split(x);assert tuple(v for pair in zip(a,b) for v in pair)+(a[-1:] if n%2 else ())==x
 flips=(tuple(v^c for v,c in zip(x,(1,)*n)) for x in words)
 assert set(flips)==set(words)
 assert sum((F(1,3**j) for j in range(1,n+1)),F(0))<F(1,2)
for n in range(1,8):
 axes=[tuple(F(1,2**j) if i==j else F(0) for i in range(1,n+1)) for j in range(1,n+1)]
 assert all(x[j-1]>0 and sum(v!=0 for v in x)==1 for j,x in enumerate(axes,1))
 assert sum(F(1,4**j) for j in range(n+1,n+20))<F(1,3*4**n)
print('Square threshold, parity products, flips and Hilbert-tail controls: PASS')
print('external_support_certified=false')
