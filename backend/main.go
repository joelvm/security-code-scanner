package main

import (
	"scs/service"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()
	router.GET("/vulnerability-types", service.GetVulnerabilityTypes)
	router.GET("/vulnerability-types/:id", service.GetVulnerabilityTypeByID)
	router.POST("/vulnerability-types", service.PostVulnerabilityType)

	router.Run("localhost:8080")
}
