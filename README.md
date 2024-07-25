# TEST PT NTX Solusi Teknologi

## TEST 1

src/lib/calculateTax.ts

### Explanation

This code defines a function calculateTax which calculates the annual tax an individual needs to pay based on their income, age, and number of dependents.

```bash
type CalculateTax = {
  income: number
  age: number
  dependents: number
}
```

CalculateTax: A TypeScript type that defines the shape of the object the function expects. It has three properties:

- income: The annual income of the individual (number).
- age: The age of the individual (number).
- dependents: The number of dependents the individual has (number).

```bash
if (income < 0 || typeof income !== "number") return "Invalid income"
if (age < 0 || typeof age !== "number") return "Invalid age"
if (dependents < 0 || typeof dependents !== "number") return "Invalid dependents"

if (age < 18) return "Not eligible for tax"

```

Validation: The function first checks if the inputs are valid.

- It returns "Invalid income" if income is less than 0 or not a number.
- It returns "Invalid age" if age is less than 0 or not a number.
- It returns "Invalid dependents" if dependents is less than 0 or not a number.
- If the age is less than 18, the function returns "Not eligible for tax"

```bash
const baseTax = (income: number) => {
  if (income <= 10000) return income * 0.1
  if (income > 10000 && income <= 50000) return income * 0.2
  return income * 0.3
}
```

baseTax: A helper function that calculates the base tax based on the income.

- If the income is less than or equal to $10,000, the tax is 10%.
- If the income is between $10,001 and $50,000, the tax is 20%.
- If the income is more than $50,000, the tax is 30%.

```bash
const totalDeduction = dependents * 500
let tax = baseTax(income)
```

totalDeduction: The total deduction based on the number of dependents. Each dependent provides a $500 deduction.
Initial Tax Calculation: The initial tax is calculated using the baseTax function.

```bash
if (age >= 65) {
  tax *= 0.8
}
```

Senior Citizen Discount: If the individual is 65 or older, they get a 20% discount on the calculated tax.

```bash
tax -= totalDeduction
```

Apply Deductions: The total deductions are subtracted from the tax.

```bash
if (tax < 0) return 0

return tax
```

Minimum Tax: If the calculated tax is less than 0, the function returns 0
Return: The final tax amount is returned.

### Run in development mode

```bash
yarn dev
```

## TEST 2

src/lib/calculateShippingCost.ts

### Explanation

This code defines a function calculateShippingCost which calculates the shipping cost of a package based on its destination, weight, and priority.

```bash
type CalculateShippingCost = {
  destination: "domestic" | "international"
  weight: number
  priority: "standard" | "express" | "priority"
}
```

CalculateShippingCost: A TypeScript type that defines the shape of the object the function expects. It has three properties:

- destination: The destination of the shipment which can be either "domestic" or "international".
- weight: The weight of the package in kilograms (number).
- priority: The shipping priority which can be "standard", "express", or "priority"

```bash
if (destination !== "domestic" && destination !== "international")
  return "Invalid destination"
if (weight <= 0) return "Invalid weight"
```

Validation: The function first checks if the inputs are valid.

- It returns "Invalid destination" if the destination is neither "domestic" nor "international".
- It returns "Invalid weight" if the weight is less than or equal to 0.

```bash
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
}

```

Domestic: If the destination is "domestic", the base cost per kg is determined based on the priority.

- "standard": $5 per kg
- "express": $10 per kg
- "priority": $20 per kg
- If the priority is invalid, it returns "Invalid priority".
  An additional cost of $10 is added if the weight exceeds 10 kg.

```bash
else if (destination === "international") {
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
```

International: If the destination is "international", the base cost per kg is determined based on the priority.

- "standard": $15 per kg
- "express": $25 per kg
- "priority": $50 per kg
- If the priority is invalid, it returns "Invalid priority".
  An additional cost of $50 is added if the weight exceeds 5 kg.

```bash
const totalCost = baseCost * weight + additionalCost
return totalCost
```

Total Cost: The total shipping cost is calculated by multiplying the base cost by the weight and adding any additional cost.
The function returns the total shipping cost.

## TEST 3

https://github.com/user-attachments/assets/6d5af00b-e5f6-4154-9c14-1a6d68697c5b

### How To Install

- Clone github repository

```bash
git clone https://github.com/finma/ntx-frontend-test.git
```

- Enter directory

```bash
cd ntx-frontend-test
```

- Install dependency

```bash
npm install
```

- Start app

```bash
npm run dev
```

The app is now running, navigate to http://localhost:5173/ in your browser to explore its UI.
