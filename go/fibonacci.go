package main

import (
	"encoding/json"
	"log"
	"net/http"
	"strconv"
)

func Handler(w http.ResponseWriter, r *http.Request) {
	param := r.URL.Query().Get("limit")
	var limit int
	if param == "" {
		limit = 1
	} else {
		limit, _ = strconv.Atoi(param)
	}

	b, err := json.Marshal(Fibonacci(limit))

	if err != nil {
		log.Fatal(err)
	}

	w.Write(b)
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
