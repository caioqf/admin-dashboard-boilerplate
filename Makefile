help:  ## Show this help message
	@echo "Usage: make <target>"
	@echo "Targets:"
	@echo "  help - Show this help message"
	@echo "  dev - Run the development server"
	@echo "  build - Build the production server"
	@echo "  lint - Run the linter"
	@echo "  format - Format the code"

dev:  ## Run the development server
	npm run dev

build:  ## Build the production server
	npm run build

lint:  ## Run the linter
	npm run lint

format:  ## Format the code
	npm run format	