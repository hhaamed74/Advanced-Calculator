// ✅ Get main elements from HTML
const display = document.getElementById("display"); // Calculator display
const buttons = document.querySelectorAll(".btn"); // All calculator buttons
const themeToggle = document.getElementById("theme-toggle"); // Theme switch button
const historyBtn = document.getElementById("history"); // History toggle button
const historyBox = document.getElementById("history-box"); // History container
const historyList = document.getElementById("history-list"); // History list element

// ✅ Variables
let currentInput = ""; // Stores current user input
let resetNext = false; // Flag to reset input after showing result
let history = []; // Stores calculation history

// ✅ Loop through all buttons and add click event
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.textContent; // Get button text

    // 🟥 Clear button
    if (value === "C") {
      currentInput = "";
      display.value = "";
      resetNext = false;

      // 🟩 Equal button (=)
    } else if (value === "=") {
      try {
        const result = eval(currentInput); // Evaluate the input
        display.value = result;
        history.push(currentInput + " = " + result); // Save operation in history
        updateHistory();
        currentInput = result.toString(); // Store result for next input
        resetNext = true;
      } catch {
        display.value = "Error"; // Show error if invalid expression
        currentInput = "";
        resetNext = true;
      }

      // 🟦 Square root button (√)
    } else if (value === "√") {
      currentInput = Math.sqrt(parseFloat(currentInput)).toString();
      display.value = currentInput;
      resetNext = true;

      // 🟪 Square button (x²)
    } else if (value === "x²") {
      currentInput = Math.pow(parseFloat(currentInput), 2).toString();
      display.value = currentInput;
      resetNext = true;

      // 🟨 Percentage button (%)
    } else if (value === "%") {
      currentInput = (parseFloat(currentInput) / 100).toString();
      display.value = currentInput;
      resetNext = true;

      // 🟧 Inverse button (1/x)
    } else if (value === "1/x") {
      currentInput = (1 / parseFloat(currentInput)).toString();
      display.value = currentInput;
      resetNext = true;

      // 🟦 Trigonometric functions (sin, cos, tan) - input in degrees
    } else if (value === "sin") {
      currentInput = Math.sin(
        (parseFloat(currentInput) * Math.PI) / 180
      ).toString();
      display.value = currentInput;
      resetNext = true;
    } else if (value === "cos") {
      currentInput = Math.cos(
        (parseFloat(currentInput) * Math.PI) / 180
      ).toString();
      display.value = currentInput;
      resetNext = true;
    } else if (value === "tan") {
      currentInput = Math.tan(
        (parseFloat(currentInput) * Math.PI) / 180
      ).toString();
      display.value = currentInput;
      resetNext = true;

      // ⌫ Backspace (delete last digit)
    } else if (value === "⌫") {
      currentInput = currentInput.slice(0, -1);
      display.value = currentInput;

      // 📜 Show/Hide history
    } else if (value === "History") {
      historyBox.style.display =
        historyBox.style.display === "none" ? "block" : "none";

      // 🔤 Default case (numbers and operators)
    } else {
      if (resetNext) {
        currentInput = ""; // Reset input after showing result
        display.value = "";
        resetNext = false;
      }
      currentInput += value; // Append button value
      display.value = currentInput;
    }
  });
});

// ✅ Update history function
function updateHistory() {
  historyList.innerHTML = ""; // Clear old history
  history.slice(-5).forEach((item) => {
    // Show last 5 calculations
    const li = document.createElement("li");
    li.textContent = item;
    historyList.appendChild(li);
  });
}

// ✅ Theme switch (Dark/Light)
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light-mode"); // Toggle theme class
  themeToggle.textContent = document.body.classList.contains("light-mode")
    ? "🌞 Light" // Change button text
    : "🌙 Dark";
});
