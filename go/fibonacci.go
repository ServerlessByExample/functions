package main

import (
	"net/http"
)

func Handler(w http.ResponseWriter, r *http.Request) {
	msg := "Hello, World!"
	w.Write([]byte(msg))
}

func Fibonacci(limit int) []int {
	f := fibonacciGenerator()
	result := make([]int, limit)

	for i := 0; i < limit; i++ {
		result[i] = f()
	}
	return result
}

func fibonacciGenerator() func() int {
	x, y := 0, 1
	return func() int {
		r := x
		x, y = y, x+y
		return r
	}
}
