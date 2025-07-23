export interface ValidationResult {
  isValid: boolean;
  error?: string;
  value?: string;
}

export interface PriceValidationOptions {
  min?: number;
  max?: number;
  allowZero?: boolean;
  decimalPlaces?: number;
}

export class PriceValidator {
  private static readonly PRICE_REGEX = /^\$?\d{1,3}(?:,\d{3})*(?:\.\d{1,2})?$/;
  private static readonly NUMERIC_REGEX = /[^\d.]/g;

  static validatePrice(
    input: string,
    options: PriceValidationOptions = {}
  ): ValidationResult {
    const { min = 0.01, max = 99999999.99, allowZero = false, decimalPlaces = 2 } = options;

    if (!input || input.trim() === '') {
      return { isValid: false, error: 'Price is required' };
    }

    const trimmed = input.trim();

    if (trimmed === '$' || trimmed === '') {
      return { isValid: false, error: 'Price is required' };
    }

    const numericString = trimmed.replace(/[^\d.]/g, '');
    
    if (!numericString || numericString === '.') {
      return { isValid: false, error: 'Please enter a valid price' };
    }

    const price = parseFloat(numericString);

    if (isNaN(price)) {
      return { isValid: false, error: 'Please enter a valid number' };
    }

    if (!allowZero && price <= 0) {
      return { isValid: false, error: 'Price must be greater than $0' };
    }

    if (price < min) {
      return { isValid: false, error: `Price must be at least $${min.toFixed(decimalPlaces)}` };
    }

    if (price > max) {
      return { isValid: false, error: `Price must not exceed $${max.toLocaleString()}` };
    }

    const decimalParts = numericString.split('.');
    if (decimalParts.length > 1 && decimalParts[1].length > decimalPlaces) {
      return { 
        isValid: false, 
        error: `Price must have at most ${decimalPlaces} decimal places` 
      };
    }

    const formattedValue = this.formatCurrency(price);
    return { isValid: true, value: formattedValue };
  }

  static formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(amount);
  }

  static formatInput(value: string): string {
    if (!value) return '';
    
    const numericValue = value.replace(/[^\d.]/g, '');
    const number = parseFloat(numericValue);
    
    if (isNaN(number)) return '';
    
    return number.toLocaleString('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });
  }

  static parseToBackendFormat(value: string): string {
    if (!value) return '';
    return value.replace(/[^\d.]/g, '');
  }
}