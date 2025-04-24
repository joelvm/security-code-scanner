package model

// SearchPattern represents a pattern to look for
type SearchPattern struct {
	ID       string `json:"id"`
	Pattern  string `json:"pattern"`
	Excludes string `json:"excludes"`
	Includes string `json:"includes"`
}

// VulnerabilityType represents data a type of vulnerability.
type VulnerabilityType struct {
	ID       string          `json:"id"`
	Name     string          `json:"name"`
	Excludes string          `json:"excludes"`
	Includes string          `json:"includes"`
	Patterns []SearchPattern `json:"patterns"`
}
