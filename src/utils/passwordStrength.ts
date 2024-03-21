export function calculatePasswordStrength(password: string) {
  // Define the criteria for a strong password
  const criteria = {
    minLength: 8,
    hasNumber: /\d/.test(password),
    hasSymbol: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password),
    hasUpperCase: /[A-Z]/.test(password),
    hasLowerCase: /[a-z]/.test(password),
  };

  // Calculate the total number of criteria met
  const totalCriteria = Object.values(criteria).filter(Boolean).length;

  // Calculate the strength level based on the number of criteria met
  let strengthLevel = (totalCriteria / Object.keys(criteria).length) * 100;

  // Adjust the strength level based on additional factors (optional)
  // For example, you could penalize passwords that only meet the minimum length requirement
  if (password.length < criteria.minLength) {
    strengthLevel *= 0.5; // Penalize the strength level by 50%
  }

  // Ensure the strength level is within the range of 0 to 100
  strengthLevel = Math.min(Math.max(strengthLevel, 0), 100);

  return strengthLevel;
}

export const STRENGTH_LEVEL_MAX = {
  risk: 30,
  weak: 80,
  safe: 100,
};
