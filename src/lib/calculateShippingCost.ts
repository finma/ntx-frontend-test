type CalculateShippingCost = {
	destination: "domestic" | "international"
	weight: number
	priority: "standard" | "express" | "priority"
}

export const calculateShippingCost = ({
	destination,
	weight,
	priority,
}: CalculateShippingCost) => {
	if (destination !== "domestic" && destination !== "international")
		return "Invalid destination"
	if (weight <= 0) return "Invalid weight"

	let baseCost = 0
	let additionalCost = 0

	if (destination === "domestic") {
		if (priority === "standard") {
			baseCost = 5
		} else if (priority === "express") {
			baseCost = 10
		} else if (priority === "priority") {
			baseCost = 20
		} else {
			return "Invalid priority"
		}

		if (weight > 10) additionalCost = 10
	} else if (destination === "international") {
		if (priority === "standard") {
			baseCost = 15
		} else if (priority === "express") {
			baseCost = 25
		} else if (priority === "priority") {
			baseCost = 50
		} else {
			return "Invalid priority"
		}

		if (weight > 5) additionalCost = 50
	}

	const totalCost = baseCost * weight + additionalCost
	return totalCost
}
