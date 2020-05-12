# Secret-Scientist

A Secret Scientist wants a client-only based crypto solution

[![Build Status](https://travis-ci.org/ankurnarkhede/Secret-Scientist.svg?branch=master)](https://travis-ci.org/ankurnarkhede/Secret-Scientist)

# Story

A scientist working at a secret organization to trace the origins of the COVID-19 has approached The Real Dev Squad for providing them with an important tool to aid in them decoding the mysteries behind the virus

Because of the political nature of this problem and the far-reaching consequences that can impact the entire world, secrecy is of paramount importance

# Requirements

Your mission, if you choose to accept, is to create a frontend-only solution to this complex cryptographic problem

- Given a string S<sub>D</sub> convert into into S<sub>E</sub> and vice-versa (D = decrypted, E = Encrypted)
- The UI should be functional and non-blocking
- Previous results should be available in the list

## Algorithm

- The string will be in one of the two formats: "S" or "S.K"
- If there is a no ".", that means it's a Decrypted string
- If the dot exists, we have an enxcrypted string and the K after the dot is the key that will be used to decrypt the string

### Encryption Algorithm:

- The Key for encryption is a a positive integer. Default value is 0
- The string will only contain uppercase letters A-Z
- The encryption revolves around creation of Narsisstic Numbers(also Armstrong Numbers). A narsisstic number is a number where if the number of digits in the number is L, then the sum of each digit raised to power of L equals the number
  e.g 9474 ( = 9 ^ 4 + 4 ^ 4 + 7 ^ 4 + 4 ^ 4 ), number of digits = 4
- For every character of the string, convert it into a number based on its sequence (A = 0, B = 1, ...). Add the _Key_ number to it. This gives you the nth Narsissistic Number in the sequence
  - e.g String = 'C....'
  - Key = 0
  - C = 2
  - NN Index, i = 2 + 0
  - Encrypted character = NarsissisticNumber(i) = 3 (3 is the 3rd NN in sequence of all valid NN)
- Append all the numbers one after the other as a string,
  E.g [2, 5, 6, 153] = "256152"
- Select the max token possible as an index of the alphabet to convert into. A-Z is the range, so, that's 0-25

  E.g "256152" = [25], [6], [15], [2] = Z G P C = "ZGPC"

- Encrypted String is the result of the previous operation

