---
title: Recurrence Relation
tags: [math, discrete-math]
use_math: true
---
# First order recurrence relation

## Definition

수열 $ \{a_n\} $ 이 어떤 고정된 수 $ s $와 $ t $에 대하여 다음과 같은 조건을 만족한다고 가정하자.
$$
\begin{align}
  a_n = sa_{n-1} + t, \text{ for } n \ge 1
\end{align}
$$
이 때, 이를 ***first order recurrence relation***이라 한다.

## Proposition 1

초기조건 $ a_n $ 이 주어진 *first order recurrence relation* $ a_n = sa_{n-1} + t, \text{ for } n \ge 1 $에 대하여, 일반항 $ a_n $은 다음과 같이 주어진다.
$$
\begin{align}
  a_n = s^na_0 + (s^{n-1} + s^{n-2} + \dots + s + 1)t
\end{align}
$$

이는 다음과 같이 축약할 수 있다.
$$
\begin{align}
  a_n = 
  \begin{cases}
    s^na_0+\frac{s^n+1}{s-1}t,& \text{ if }s\ne1\\
    a_0+nt,&\text{ if }s=1
  \end{cases}
\end{align}
$$
# Second order recurrence relation

## Definition

수열 $ \{ a_n \} $이 어떤 고정된 수 $ s_1 $과 $ s_2 $에 대하여 다음과 같은 조건을 만족한다고 가정하자.
$$
\begin{align}
  a_n = s_1a_{n-1}+s_2a_{n-2}, \text{ for } n \ge 2
\end{align}
$$
이 때, 이를 ***second order recurrence relation***이라 한다.
\\
\\
어떤 *second order recurrence relation* $ a_n = s_1a_{n-1} + s_2a_{n-2}, \text{ for } n \ge 2 $ 를 가지고 있다고 가정하자.
이 때, 다음과 같은 2차 방정식을 생각할수 있다.
$$
\begin{align}
x^2 = s_1x + s_2
\end{align}
$$


## Proposition 1

$ r $이 (5)의 한 근이라 가정하자. 

그러면 $ a_n = r^n $은 *second order recurrence relation*을 만족한다.

## Proposition 2

이 때, $ r_1, r_2 $가 (5)의 서로 다른 두 근이라 가정하자. 

그러면 $ a_n = c_1{r_1}^n + c_2{r_2}^n $ 는 *second order recurrence relation*을 만족한다.

## Proposition 3

$ r $이 (5)의 중근이라 가정하자. 

그러면 $ a_n = nr^n $ 은 *second order recurrence relation*을 만족한다.  

*Proposition 2*에 의하여, 주어진 방정식이 중근을 가질 경우 $ a_n = c_1r^n + c_2nr^n $ 는 *second order recurrence relation*을 만족한다.

---  
일반적으로 *k-th order recurrence relation* $ a_n = s_1+a_{n-1} + \dots + s_k \text{ for } n \ge k $ 가 주어졌을 때, 
$ x^k = s_1x^{k-1}  + \dots + s_k $의 해를 구하여 유사한 방법으로 일반항 $ a_n $을 구할 수 있다.
