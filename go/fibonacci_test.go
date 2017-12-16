package main

import (
	"testing"
)

func TestFibonacci(t *testing.T) {
	result := Fibonacci(5)
	expected := []int{0, 1, 1, 2, 3}

	if !ArrayEquals(result, expected) {
		t.Error("Expected ", expected, " but got", result)
	}
}

func TestFibonacciNoElements(t *testing.T) {
	result := Fibonacci(0)
	expected := []int{}

	if !ArrayEquals(result, expected) {
		t.Error("Expected ", expected, " but got", result)
	}
}

func TestFibonacciLotsOfElements(t *testing.T) {
	result := Fibonacci(50)
	expected := []int{0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181, 6765, 10946, 17711, 28657, 46368, 75025, 121393, 196418, 317811, 514229, 832040, 1346269, 2178309, 3524578, 5702887, 9227465, 14930352, 24157817, 39088169, 63245986, 102334155, 165580141, 267914296, 433494437, 701408733, 1134903170, 1836311903, 2971215073, 4807526976, 7778742049}

	if !ArrayEquals(result, expected) {
		t.Error("Expected ", expected, " but got", result)
	}
}

func ArrayEquals(a []int, b []int) bool {
	if len(a) != len(b) {
		return false
	}
	for i, each := range a {
		if each != b[i] {
			return false
		}
	}
	return true
}
