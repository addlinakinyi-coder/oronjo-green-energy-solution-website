document.addEventListener('DOMContentLoaded', () => {
    // Set dynamic copyright year
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // Mobile menu toggle logic
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Solar savings estimator logic
    const billInput = document.getElementById('monthly-bill');
    const goalSelect = document.getElementById('power-goal');
    const sysRec = document.getElementById('sys-recommendation');
    const estSavings = document.getElementById('est-savings');

    function updateCalculator() {
        if (!billInput || !goalSelect || !sysRec || !estSavings) return;
        const bill = parseFloat(billInput.value) || 0;
        const goalRatio = parseFloat(goalSelect.value) || 0.8;
        const savings = Math.round(bill * goalRatio);

        if (bill < 5000) {
            sysRec.textContent = "1.5 kW Compact Solar System";
        } else if (bill < 15000) {
            sysRec.textContent = "3.5 kW Hybrid Solar System";
        } else if (bill < 35000) {
            sysRec.textContent = "5.0 kW High-Output System";
        } else {
            sysRec.textContent = "10+ kW Commercial Solar Setup";
        }

        estSavings.textContent = `KES ${savings.toLocaleString()} / mo`;
    }

    if (billInput && goalSelect) {
        billInput.addEventListener('input', updateCalculator);
        goalSelect.addEventListener('change', updateCalculator);
    }
});

// Modal toggle utility
function toggleModal(show) {
    const modal = document.getElementById('quote-modal');
    if (modal) {
        if (show) modal.classList.remove('hidden');
        else modal.classList.add('hidden');
    }
}

// Copy to clipboard utility
function copyToClipboard(text, label) {
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text);
    } else {
        const input = document.createElement('input');
        input.value = text;
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        document.body.removeChild(input);
    }
    showToast(`${label} (${text}) copied!`);
}

// Toast notification helper
function showToast(msg) {
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toast-msg');
    if (toast && toastMsg) {
        toastMsg.textContent = msg;
        toast.classList.remove('hidden');
        toast.classList.add('flex');
        setTimeout(() => {
            toast.classList.add('hidden');
            toast.classList.remove('flex');
        }, 3500);
    }
}

// Form submission handler
function handleQuoteSubmit(e) {
    e.preventDefault();
    toggleModal(false);
    showToast("Thank you! Request received. An engineer will contact you at 0713 604 062.");
    e.target.reset();
}
