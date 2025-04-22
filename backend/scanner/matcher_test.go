package scanner

import (
	"testing"
)

// TestXSSEmptyPattern calls scanner.Matches with a empty pattern, checking
// for an error to be thrown.
func TestXSSEmptyPattern(t *testing.T) {
	sentence := "<html>Hello World!</html>"

	_, err := Matches(sentence, "")
	if err == nil {
		t.Errorf(`Should return error if empty pattern, %v`, err)
	}
}

// TestXSSEmptySentence calls scanner.Matches with a empty sentence, checking
// for an error to be thrown.
func TestXSSEmptySentence(t *testing.T) {
	pattern := `\bAlert\s*\(.*\).*`

	_, err := Matches("", pattern)
	if err == nil {
		t.Errorf(`Should return error if empty sentence, %v`, err)
	}
}

// TestNoXSSVulnerability calls scanner.Matches with a sentence and pattern, checking
// for a valid return value.
func TestNoXSSVulnerability(t *testing.T) {
	pattern := `\bAlert\s*\(.*\).*`
	sentence := "<html>Hello World!</html>"

	res, err := Matches(sentence, pattern)
	if res || err != nil {
		t.Errorf(`Sentence: %q, should not match pattern: %q, %v`, sentence, pattern, err)
	}
}

// TestNoXSSVulnerability calls scanner.Matches with a sentence and pattern, checking
// for a invalid return value.
func TestXSSVulnerability(t *testing.T) {
	pattern := `\bAlert\s*\(.*\).*`
	sentence := "<script>Alert('Hello World!');</script>"

	res, err := Matches(sentence, pattern)
	if !res || err != nil {
		t.Errorf(`Sentence: %q, should match pattern: %q, %v`, sentence, pattern, err)
	}
}

func TestNoSQLVulnerability(t *testing.T) {
	pattern := `SELECT.*WHERE`
	sentence := `log.Printf("WHERE: %q matches SELECT:%q", sentence, pattern)`

	res, err := Matches(sentence, pattern)
	if res || err != nil {
		t.Errorf(`Sentence: %q, should not match pattern: %q, %v`, sentence, pattern, err)
	}
}

func TestSQLVulnerability(t *testing.T) {
	pattern := `SELECT.*WHERE`
	sentence := `sql := "SELECT * FROM users WHERE id=1;"`

	res, err := Matches(sentence, pattern)
	if !res || err != nil {
		t.Errorf(`Sentence: %q, should match pattern: %q, %v`, sentence, pattern, err)
	}
}
