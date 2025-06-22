const form = document.getElementById('contactForm');
const confirmation = document.getElementById('confirmation');

form.addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    const now = new Date().toLocaleString();

    if (!name || !email || !message) {
        confirmation.textContent = '⚠️ Please fill in all fields.';
        return;
    }

    confirmation.innerHTML = `✅ Message saved! PDF will download shortly.`;
    form.reset();

    // Create and download PDF
    const {
        jsPDF
    } = window.jspdf;
    const doc = new jsPDF();

    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text("Contact Submission", 20, 20);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text(`Name: ${name}`, 20, 40);
    doc.text(`Email: ${email}`, 20, 50);
    doc.text("Message:", 20, 60);
    doc.text(doc.splitTextToSize(message, 160), 20, 70);
    doc.text(`Submitted on: ${now}`, 20, 130);

    doc.save(`${name}_contact.pdf`);
});