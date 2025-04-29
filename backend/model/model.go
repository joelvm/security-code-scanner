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

// RunScanType represents data a type of vulnerability.
type RunScanType struct {
	Type     string `json:"type"`
	Path     string `json:"path"`
	Excludes string `json:"excludes"`
	Includes string `json:"includes"`
}

// RunScanType represents data a type of vulnerability.
type ScanResultType struct {
	File    string                `json:"match"`
	Matches []ScanResultMatchType `json:"fragments"`
}

type ScanResultMatchType struct {
	Match    string               `json:"match"`
	Fragment []ResultFragmentType `json:"fragments"`
}

type ResultFragmentType struct {
	Number  int    `json:"number"`
	Content string `json:"content"`
}
