---
layout: post
author: cdltlehf
---



# Principle of Mathmatical Induction

집합 $ E ​$가 $ \mathbb{N} ​$의 부분집합이라 하자.

집합 $E​$가

1. $ 1 \in E ​$
2. $ n \in E \implies n + 1 \in E ​$ 

 를 만족할경우 $ E = \mathbb{N} ​$ 이다.



# Well-ordering Principle

$ \forall A \subset \mathbb{N}: A \ne \varnothing \implies A \text{ has the least element}$

>  $ \mathbb{N} ​$의 모든 공집합이 아닌 부분집합은 최소 원소를 가진다.



## Well-ordering Principle에 대한 증명

집합 $ E ​$가 $ \mathbb{N} ​$의 공집합이 아닌 부분집합이라 하자. 

귀류법을 사용하기 위하여 $E​$가 최소 원소를 가지지 않는다고 가정하자.

$A = \{n \in \mathbb{N}  \mid  \forall k \in E: n < k \} ​$ 라 하자.

$A \cap E = \varnothing $ 이므로 $A = \mathbb{N} $ 임을 보이면 충분하다.

