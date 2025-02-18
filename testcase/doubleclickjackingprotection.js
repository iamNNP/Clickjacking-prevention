window.addEventListener('DOMContentLoaded', (event) => {
    document.querySelectorAll('button').forEach(button => {
        button.disabled = true;
    });
    let enableButtonsTimeout;
    window.addEventListener('mousemove', (event) => {
        clearTimeout(enableButtonsTimeout);
        enableButtonsTimeout = setTimeout(() => {
            document.querySelectorAll('button').forEach(button => {
                button.disabled = false;
            });
        }, 1000);
    }, { once: true });
});
