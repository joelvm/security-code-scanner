package processor

import (
	"errors"
	"fmt"
	"regexp"
	"scs/model"
	"strings"
)

// Function to test a sentence agains a pattern
func Matches(sentence string, pattern string) ([]model.ScanResultMatchType, error) {

	if sentence == "" {
		return nil, errors.New("empty sentence")
	}

	if pattern == "" {
		return nil, errors.New("empty pattern")
	}

	//log.SetPrefix("tester: ")
	//log.Printf("Testing the sentence: %q against the pattern: %q", sentence, pattern)

	re := regexp.MustCompile(pattern)
	actualMatch := re.FindString(sentence)

	if actualMatch != "" {
		res := GetFragmentForMatch(sentence, actualMatch)
		return res, nil
	}

	return nil, nil
}

// Returns the 2 lines before and after que given match
// TODO: Improve fragment calculation
func GetFragmentForMatch(content string, searchText string) []model.ScanResultMatchType {
	lines := strings.Split(content, "\n")
	matchIndices := make([]int, 0)

	var res []model.ScanResultMatchType

	// Find indices of matches
	for i, line := range lines {
		if strings.Contains(line, searchText) {
			matchIndices = append(matchIndices, i)
		}
	}

	for _, matchIndex := range matchIndices {
		fmt.Printf("\n-- Match found at line %d: %s --\n", matchIndex+1, lines[matchIndex])

		var res2 model.ScanResultMatchType
		res2.Match = searchText

		// Print lines before the match
		start := max(0, matchIndex-2)
		end := min(matchIndex+3, len(lines))

		for i := start; i < end; i++ {
			res2.Fragment = append(res2.Fragment, model.ResultFragmentType{Number: i, Content: lines[i]})
		}

		res = append(res, res2)
	}

	return res
}
