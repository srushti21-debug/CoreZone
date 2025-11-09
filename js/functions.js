// Utility functions for the gym management system

// Member related functions
function addMember(memberData) {
    // Add new member to the system
    return {
        success: true,
        message: 'Member added successfully'
    };
}

function updateMember(memberId, memberData) {
    // Update existing member information
    return {
        success: true,
        message: 'Member updated successfully'
    };
}

function deleteMember(memberId) {
    // Delete member from the system
    return {
        success: true,
        message: 'Member deleted successfully'
    };
}

// Trainer related functions
function addTrainer(trainerData) {
    // Add new trainer to the system
    return {
        success: true,
        message: 'Trainer added successfully'
    };
}

function updateTrainer(trainerId, trainerData) {
    // Update existing trainer information
    return {
        success: true,
        message: 'Trainer updated successfully'
    };
}

function deleteTrainer(trainerId) {
    // Delete trainer from the system
    return {
        success: true,
        message: 'Trainer deleted successfully'
    };
}

// Payment related functions
function processPayment(paymentData) {
    // Process new payment
    return {
        success: true,
        message: 'Payment processed successfully',
        transactionId: generateTransactionId()
    };
}

function getPaymentHistory(memberId) {
    // Get payment history for a member
    return {
        success: true,
        data: []
    };
}

// Utility functions
function generateTransactionId() {
    return 'TXN' + Date.now();
}

function validateMembershipStatus(memberId) {
    // Check if membership is active
    return {
        active: true,
        expiryDate: '2024-12-31'
    };
}

function calculateMembershipFees(planType, duration) {
    // Calculate membership fees based on plan and duration
    const baseFees = {
        basic: 1000,
        standard: 2000,
        premium: 3000
    };
    
    return baseFees[planType] * duration;
}

// Date and time utilities
function formatDate(date) {
    return new Date(date).toLocaleDateString();
}

function calculateAge(birthDate) {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        age--;
    }
    
    return age;
}