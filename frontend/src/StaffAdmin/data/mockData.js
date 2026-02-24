export const upcomingPatients = [
  { id: "#A-124", name: "Sarah Miller", wait: "2 min", next: true },
  { id: "#A-125", name: "Michael Ross", wait: "5 min" },
  { id: "#A-126", name: "Elena Gilbert", wait: "9 min" },
  { id: "#B-004", name: "Priority: David B.", wait: "12 min", priority: true },
  { id: "#A-127", name: "Rachel Zane", wait: "15 min" },
];

export const queuePatients = [
  { ticket: "#A-123", name: "Johnathan Doe", initials: "JD", type: "Regular Check-up", checkIn: "09:15 AM", wait: "14 mins", status: "IN PROGRESS" },
  { ticket: "#A-124", name: "Sarah Miller", initials: "SM", type: "Blood Test", checkIn: "09:30 AM", wait: "2 mins", status: "NEXT" },
  { ticket: "#B-004", name: "David Brooks", initials: "DB", type: "Emergency Consult", checkIn: "09:42 AM", wait: "12 mins", status: "PRIORITY" },
  { ticket: "#A-125", name: "Michael Ross", initials: "MR", type: "General Consultation", checkIn: "09:35 AM", wait: "5 mins", status: "WAITING" },
  { ticket: "#A-126", name: "Elena Gilbert", initials: "EG", type: "X-Ray Scan", checkIn: "09:38 AM", wait: "9 mins", status: "WAITING" },
];

export const historyRecords = [
  { ticket: "#A-122", patient: "Emily Watson", provider: "Dr. Robert Chen", providerBg: "bg-indigo-500", providerInitials: "DR", duration: "12m 45s", completed: "10:42 AM" },
  { ticket: "#B-003", patient: "Marcus Sterling", provider: "Nurse Sarah Smith", providerBg: "bg-emerald-500", providerInitials: "NS", duration: "05m 12s", completed: "10:28 AM" },
  { ticket: "#A-121", patient: "Linda Graham", provider: "Dr. Robert Chen", providerBg: "bg-indigo-500", providerInitials: "DR", duration: "15m 30s", completed: "10:15 AM" },
  { ticket: "#A-120", patient: "David Miller", provider: "Dr. Emily Stone", providerBg: "bg-amber-500", providerInitials: "ST", duration: "08m 55s", completed: "09:58 AM" },
  { ticket: "#C-012", patient: "Thomas Shelby", provider: "Nurse James Bond", providerBg: "bg-emerald-500", providerInitials: "NJ", duration: "04m 20s", completed: "09:42 AM" },
];

export const historyBars = [35, 55, 80, 65, 50, 45, 60, 75, 90, 70];
export const historyLabels = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00"];
