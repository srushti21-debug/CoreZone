/* Basic UI */
const menuBtn = document.getElementById('menuBtn');
const nav = document.getElementById('nav');
menuBtn && menuBtn.addEventListener('click', ()=> nav.classList.toggle('open'));

// header background on scroll (keeps dark -> slightly lighter on scroll)
const header = document.querySelector('.header');
window.addEventListener('scroll', ()=>{
  if(window.scrollY>40) header.style.background = "rgba(0,0,0,0.95)";
  else header.style.background = "rgba(0,0,0,0.85)";
});

// hero slider
let slider = document.getElementById('heroSlider');
let idx = 0;
const slides = () => document.querySelectorAll('.slide');

function goToSlide(i){
  if(!slider) return;
  slider.style.transform = `translateX(-${i * 100}%)`;
}

setInterval(()=> {
  const s = slides();
  if(!s.length) return;
  idx = (idx+1) % s.length;
  goToSlide(idx);
}, 5000);

// lightbox for gallery
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
document.querySelectorAll('.gallery-item').forEach(img=>{
  img.addEventListener('click', (e)=>{
    lightboxImg.src = e.target.src;
    lightbox.style.display = 'flex';
    lightbox.setAttribute('aria-hidden','false');
  });
});
document.getElementById('lightboxClose').addEventListener('click', ()=>{
  lightbox.style.display = 'none';
  lightbox.setAttribute('aria-hidden','true');
});

// Booking (localStorage demo)
const bookingForm = document.getElementById('bookingForm');
const bookingTableBody = document.querySelector('#bookingTable tbody');

function loadBookings(){
  const bookings = JSON.parse(localStorage.getItem('cz_bookings')||'[]');
  if(!bookingTableBody) return;
  bookingTableBody.innerHTML = '';
  bookings.forEach(b=>{
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${b.member_id}</td><td>${b.trainer_id}</td><td>${b.date}</td><td>${b.time_slot}</td>`;
    bookingTableBody.appendChild(tr);
  });
}
loadBookings();

bookingForm && bookingForm.addEventListener('submit', (e)=>{
  e.preventDefault();
  const trainer_id = document.getElementById('booking_trainer_id').value || 'T1';
  const member_id = document.getElementById('booking_member_id').value.trim();
  const date = document.getElementById('booking_date').value;
  const time_slot = document.getElementById('booking_time').value;
  if(!member_id || !date || !time_slot) return alert('Please fill all fields');

  const bookings = JSON.parse(localStorage.getItem('cz_bookings')||'[]');
  bookings.push({trainer_id, member_id, date, time_slot});
  localStorage.setItem('cz_bookings', JSON.stringify(bookings));
  loadBookings();
  bookingForm.reset();
  alert('Booking saved locally. Backend should accept POST /trainer_schedule with trainer_id, member_id, date, time_slot');
});

// Trainer booking buttons
document.querySelectorAll('.book-session, .book').forEach(btn=>{
  btn.addEventListener('click',(e)=>{
    const t = e.currentTarget.dataset.trainerId || e.currentTarget.closest('.trainer-card')?.dataset.trainerId;
    if(document.getElementById('booking_trainer_id')) document.getElementById('booking_trainer_id').value = t || '';
    if(document.getElementById('booking_member_id')) document.getElementById('booking_member_id').focus();
    window.location.hash = '#schedule';
  });
});

// Join form (member + payment mock)
const joinForm = document.getElementById('joinForm');
const joinMsg = document.getElementById('joinMsg');
joinForm && joinForm.addEventListener('submit',(e)=>{
  e.preventDefault();
  const member = {
    member_id: document.getElementById('member_id').value.trim(),
    name: document.getElementById('member_name').value.trim(),
    contact_no: document.getElementById('member_contact').value.trim(),
    join_date: document.getElementById('member_join_date').value,
    plan_id: document.getElementById('member_plan').value
  };
  if(!member.member_id || !member.name) return alert('Please fill required fields');

  const members = JSON.parse(localStorage.getItem('cz_members')||'[]');
  members.push(member);
  localStorage.setItem('cz_members', JSON.stringify(members));

  const payments = JSON.parse(localStorage.getItem('cz_payments')||'[]');
  payments.push({
    payment_id: "P"+Date.now(),
    member_id: member.member_id,
    amount: member.plan_id==='1' ? 999 : member.plan_id==='2' ? 2699 : 9499,
    date: new Date().toISOString().slice(0,10)
  });
  localStorage.setItem('cz_payments', JSON.stringify(payments));

  if(joinMsg) joinMsg.textContent = 'Registered & payment recorded locally. Backend should accept POST /member and POST /payments.';
  joinForm.reset();
  window.scrollTo({top:0,behavior:'smooth'});
});

// Contact form
const contactForm = document.getElementById('contactForm');
contactForm && contactForm.addEventListener('submit',(e)=>{
  e.preventDefault();
  alert('Message sent (frontend mock). Backend: POST /contact {name,email,message}');
  contactForm.reset();
});

// Attendance demo
const loadAttendanceBtn = document.getElementById('loadAttendance');
if(loadAttendanceBtn) {
  loadAttendanceBtn.addEventListener('click', ()=>{
    const bookings = JSON.parse(localStorage.getItem('cz_bookings')||'[]');
    const tbody = document.querySelector('#attendanceTable tbody');
    if(!tbody) return;
    tbody.innerHTML = '';
    bookings.forEach(b=>{
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>${b.member_id}</td><td>${b.trainer_id}</td><td>${b.date}</td><td>Present</td>`;
      tbody.appendChild(tr);
    });
    if(!bookings.length) alert('No bookings yet.');
  });
}

// view profile quick preview
document.querySelectorAll('.view-profile').forEach(btn=>{
  btn.addEventListener('click', (e)=>{
    const card = e.currentTarget.closest('.trainer-card');
    const name = card.querySelector('h3').textContent;
    const spec = card.querySelector('.spec').textContent;
    alert(`${name}\nSpecialization: ${spec}\n(Full profile can be built later)`);
  });
});

// footer year
const yearEl = document.getElementById('year');
if(yearEl) yearEl.textContent = new Date().getFullYear();

console.info("Frontend demo uses localStorage keys: cz_members, cz_payments, cz_bookings. Suggested backend endpoints: GET /membership_plan, GET /trainers, POST /member, POST /payments, POST /trainer_schedule, GET /attendance");
