type CalculateTax = {
	income: number
	age: number
	dependents: number
}

export const calculateTax = ({ income, age, dependents }: CalculateTax) => {
	// Validate input
	if (income < 0 || typeof income !== "number") return "Invalid income"
	if (age < 0 || typeof income !== "number") return "Invalid age"
	if (dependents < 0 || typeof income !== "number") return "Invalid dependents"

	// Check age
	if (age < 18) return '"Not eligible for tax'

	// Helper to determine base tax
	const baseTax = (income: number) => {
		if (income <= 10000) return income * 0.1
		if (income > 10000 && income <= 50000) return income * 0.2
		return income * 0.3
	}

	// Calculate total deduction
	const totalDeduction = dependents * 500

	let tax = baseTax(income)

	if (age >= 65) {
		tax *= 0.8
	}

	// total tax - deduction
	tax -= totalDeduction

	if (tax < 0) return 0

	return tax
}
