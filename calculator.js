// Asphalt Cost Calculator for Len Industries
document.addEventListener('DOMContentLoaded', function() {
    // Create the calculator HTML
    const calculatorHTML = `
        <div class="asphalt-calculator">
            <h3>Get an instant estimate</h3>
            <form id="asphalt-calc-form">
                <div class="form-group">
                    <label for="width">What is the width of your asphalt?</label>
                    <input type="number" id="width" name="width" placeholder="Enter width in feet" min="0" step="0.1">
                    <span class="unit">feet</span>
                </div>
                
                <div class="form-group">
                    <label for="length">What is the length of your asphalt?</label>
                    <input type="number" id="length" name="length" placeholder="Enter length in feet" min="0" step="0.1">
                    <span class="unit">feet</span>
                </div>
                
                <div class="form-group">
                    <button type="button" id="calculate-btn">Calculate Estimate</button>
                </div>
                
                <div id="results" class="results" style="display: none;">
                    <h4>Estimated price between</h4>
                    <div class="price-range">
                        <span id="low-price">$0</span>
                        <span class="and">and</span>
                        <span id="high-price">$0</span>
                    </div>
                    <p class="disclaimer">This is an estimate. For exact pricing please contact us for an official quote.</p>
                </div>
            </form>
        </div>
    `;
    
    // Add calculator styles
    const calculatorCSS = `
        <style>
        .asphalt-calculator {
            max-width: 500px;
            margin: 20px auto;
            padding: 30px;
            background: #f8f9fa;
            border-radius: 10px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        
        .asphalt-calculator h3 {
            text-align: center;
            margin-bottom: 25px;
            color: #333;
            font-size: 24px;
        }
        
        .form-group {
            margin-bottom: 20px;
        }
        
        .form-group label {
            display: block;
            margin-bottom: 8px;
            font-weight: 600;
            color: #555;
        }
        
        .form-group input {
            width: 100%;
            padding: 12px;
            border: 2px solid #ddd;
            border-radius: 5px;
            font-size: 16px;
            box-sizing: border-box;
        }
        
        .form-group input:focus {
            outline: none;
            border-color: #007bff;
        }
        
        .unit {
            color: #666;
            font-size: 14px;
            margin-left: 10px;
        }
        
        #calculate-btn {
            width: 100%;
            padding: 15px;
            background: #007bff;
            color: white;
            border: none;
            border-radius: 5px;
            font-size: 18px;
            font-weight: 600;
            cursor: pointer;
            transition: background 0.3s;
        }
        
        #calculate-btn:hover {
            background: #0056b3;
        }
        
        .results {
            margin-top: 25px;
            padding: 20px;
            background: white;
            border-radius: 8px;
            border: 2px solid #28a745;
        }
        
        .results h4 {
            text-align: center;
            margin-bottom: 15px;
            color: #333;
        }
        
        .price-range {
            text-align: center;
            margin-bottom: 15px;
        }
        
        .price-range span {
            font-size: 24px;
            font-weight: bold;
            color: #28a745;
        }
        
        .and {
            margin: 0 15px;
            color: #666;
            font-weight: normal;
        }
        
        .disclaimer {
            text-align: center;
            font-size: 14px;
            color: #666;
            margin: 0;
        }
        
        .error {
            color: #dc3545;
            font-size: 14px;
            margin-top: 5px;
        }
        </style>
    `;
    
    // Add CSS to head
    document.head.insertAdjacentHTML('beforeend', calculatorCSS);
    
    // Find the estimate section and replace the broken form
    const estimateSection = document.getElementById('estimate');
    if (estimateSection) {
        // Find the form container
        const formContainer = estimateSection.querySelector('.ct-shortcode');
        if (formContainer) {
            formContainer.innerHTML = calculatorHTML;
        }
    }
    
    // Calculator functionality
    const calculateBtn = document.getElementById('calculate-btn');
    const widthInput = document.getElementById('width');
    const lengthInput = document.getElementById('length');
    const resultsDiv = document.getElementById('results');
    const lowPriceSpan = document.getElementById('low-price');
    const highPriceSpan = document.getElementById('high-price');
    
    function calculateEstimate() {
        const width = parseFloat(widthInput.value);
        const length = parseFloat(lengthInput.value);
        
        // Clear previous errors
        document.querySelectorAll('.error').forEach(error => error.remove());
        
        // Validate inputs
        if (!width || width <= 0) {
            showError(widthInput, 'Please enter a valid width');
            return;
        }
        
        if (!length || length <= 0) {
            showError(lengthInput, 'Please enter a valid length');
            return;
        }
        
        // Calculate square yards (convert from square feet)
        const squareYards = (width * length) / 9;
        
        // Calculate price range ($1-1.50 per square yard)
        const lowPrice = Math.round(squareYards * 1);
        const highPrice = Math.round(squareYards * 1.50);
        
        // Display results
        lowPriceSpan.textContent = '$' + lowPrice.toLocaleString();
        highPriceSpan.textContent = '$' + highPrice.toLocaleString();
        resultsDiv.style.display = 'block';
        
        // Scroll to results
        resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    
    function showError(input, message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error';
        errorDiv.textContent = message;
        input.parentNode.appendChild(errorDiv);
    }
    
    // Event listeners
    calculateBtn.addEventListener('click', calculateEstimate);
    
    // Calculate on Enter key
    widthInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            calculateEstimate();
        }
    });
    
    lengthInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            calculateEstimate();
        }
    });
    
    // Auto-calculate as user types (with debounce)
    let timeout;
    [widthInput, lengthInput].forEach(input => {
        input.addEventListener('input', function() {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                if (widthInput.value && lengthInput.value) {
                    calculateEstimate();
                }
            }, 500);
        });
    });
});
