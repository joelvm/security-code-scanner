package scanner

import (
	"errors"
	"log"
	"regexp"
)

// Function to test a sentence agains a pattern
func Matches(sentence string, pattern string) (bool, error) {

	if sentence == "" {
		return false, errors.New("empty sentence")
	}

	if pattern == "" {
		return false, errors.New("empty pattern")
	}

	log.SetPrefix("tester: ")
	log.Printf("Testing the sentence: %q against the pattern: %q", sentence, pattern)

	re := regexp.MustCompile(pattern)
	actualMatch := re.MatchString(sentence)

	if actualMatch {
		log.Printf("Sentence: %q matches pattern:%q", sentence, pattern)
	} else {
		log.Printf("Sentence: %q doen't match pattern: %q", sentence, pattern)
	}

	return actualMatch, nil
}
