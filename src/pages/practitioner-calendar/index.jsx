import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import CalendarHeader from './components/CalendarHeader';
import CalendarGrid from './components/CalendarGrid';
import ResourcePanel from './components/ResourcePanel';
import AppointmentModal from './components/AppointmentModal';
import PendingApprovals from './components/PendingApprovals';
import QuickStats from './components/QuickStats';

const PractitionerCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('week');
  const [selectedResources, setSelectedResources] = useState(['all']);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAuthenticated] = useState(true);
  const [userName] = useState('Admin');
  const navigate = useNavigate();

  // Mock data for appointments
  const [appointments] = useState([
    {
      id: 1,
      patientName: "Priya Sharma",
      therapyType: "Abhyanga (Oil Massage)",
      date: new Date(2025, 8, 9),
      time: "09:00",
      duration: 60,
      resourceId: "vaidya-1",
      room: "Room 101",
      status: "confirmed",
      notes: "Patient prefers sesame oil. Has mild back pain.",
      hasConflict: false,
      isUrgent: false,
      isRecurring: true
    },
    {
      id: 2,
      patientName: "Amit Kumar",
      therapyType: "Shirodhara (Oil Dripping)",
      date: new Date(2025, 8, 9),
      time: "10:30",
      duration: 90,
      resourceId: "vaidya-2",
      room: "Room 102",
      status: "pending",
      notes: "First-time patient. Requires detailed consultation.",
      hasConflict: false,
      isUrgent: true,
      isRecurring: false
    },
    {
      id: 3,
      patientName: "Sunita Devi",
      therapyType: "Virechana (Purgation)",
      date: new Date(2025, 8, 10),
      time: "08:00",
      duration: 120,
      resourceId: "vaidya-1",
      room: "Room 103",
      status: "confirmed",
      notes: "Day 3 of Panchakarma treatment. Monitor vitals closely.",
      hasConflict: false,
      isUrgent: false,
      isRecurring: true
    },
    {
      id: 4,
      patientName: "Rajesh Gupta",
      therapyType: "Basti (Medicated Enema)",
      date: new Date(2025, 8, 11),
      time: "14:00",
      duration: 60,
      resourceId: "vaidya-3",
      room: "Room 104",
      status: "pending",
      notes: "Chronic digestive issues. Requires special preparation.",
      hasConflict: true,
      isUrgent: false,
      isRecurring: false
    },
    {
      id: 5,
      patientName: "Meera Patel",
      therapyType: "Nasya (Nasal Therapy)",
      date: new Date(2025, 8, 12),
      time: "11:00",
      duration: 45,
      resourceId: "vaidya-2",
      room: "Room 105",
      status: "completed",
      notes: "Sinus congestion treatment completed successfully.",
      hasConflict: false,
      isUrgent: false,
      isRecurring: false
    }
  ]);

  // Mock data for resources
  const [resources] = useState([
    {
      id: "vaidya-1",
      name: "Dr. Rajesh Sharma",
      type: "practitioner",
      status: "available",
      currentAppointments: 3,
      hasConflict: false,
      specialization: "Panchakarma Specialist"
    },
    {
      id: "vaidya-2",
      name: "Dr. Priya Agarwal",
      type: "practitioner",
      status: "busy",
      currentAppointments: 5,
      hasConflict: false,
      specialization: "Ayurvedic Physician"
    },
    {
      id: "vaidya-3",
      name: "Dr. Suresh Kumar",
      type: "practitioner",
      status: "available",
      currentAppointments: 2,
      hasConflict: true,
      specialization: "Herbal Medicine Expert"
    },
    {
      id: "room-101",
      name: "Abhyanga Room 101",
      type: "room",
      status: "available",
      currentAppointments: 4,
      hasConflict: false,
      capacity: 1
    },
    {
      id: "room-102",
      name: "Shirodhara Room 102",
      type: "room",
      status: "busy",
      currentAppointments: 6,
      hasConflict: false,
      capacity: 1
    },
    {
      id: "room-103",
      name: "Panchakarma Suite 103",
      type: "room",
      status: "available",
      currentAppointments: 2,
      hasConflict: false,
      capacity: 2
    },
    {
      id: "equipment-1",
      name: "Shirodhara Stand Set A",
      type: "equipment",
      status: "available",
      currentAppointments: 3,
      hasConflict: false,
      condition: "Excellent"
    },
    {
      id: "equipment-2",
      name: "Steam Chamber Unit B",
      type: "equipment",
      status: "unavailable",
      currentAppointments: 0,
      hasConflict: false,
      condition: "Under Maintenance"
    }
  ]);

  // Mock stats data
  const [stats] = useState({
    todayAppointments: 8,
    pendingApprovals: 3,
    completedToday: 5,
    resourceUtilization: 78
  });

  const pendingAppointments = appointments?.filter(apt => apt?.status === 'pending');

  const handleDateNavigation = (direction) => {
    const newDate = new Date(currentDate);

    if (viewMode === 'day') {
      newDate?.setDate(currentDate?.getDate() + (direction === 'next' ? 1 : -1));
    } else if (viewMode === 'week') {
      newDate?.setDate(currentDate?.getDate() + (direction === 'next' ? 7 : -7));
    } else if (viewMode === 'month') {
      newDate?.setMonth(currentDate?.getMonth() + (direction === 'next' ? 1 : -1));
    }

    setCurrentDate(newDate);
  };

  const handleTodayClick = () => {
    setCurrentDate(new Date());
  };

  const handleViewChange = (newViewMode) => {
    setViewMode(newViewMode);
  };

  const handleResourceToggle = (resourceId) => {
    if (resourceId === 'all') {
      setSelectedResources(resources?.map(r => r?.id));
    } else if (resourceId === 'none') {
      setSelectedResources([]);
    } else if (resourceId === 'available') {
      setSelectedResources(resources?.filter(r => r?.status === 'available')?.map(r => r?.id));
    } else {
      setSelectedResources(prev =>
        prev?.includes(resourceId)
          ? prev?.filter(id => id !== resourceId)
          : [...prev, resourceId]
      );
    }
  };

  const handleAppointmentClick = (appointment) => {
    setSelectedAppointment(appointment);
    setIsModalOpen(true);
  };

  const handleTimeSlotClick = (time, resourceId, date) => {
    setSelectedAppointment({
      time,
      resourceId,
      date,
      status: 'pending'
    });
    setIsModalOpen(true);
  };

  const handleAppointmentDrop = (appointment, newTime, newDate) => {
    console.log('Appointment dropped:', { appointment, newTime, newDate });
    // Handle appointment rescheduling logic here
  };

  const handleAppointmentSave = (appointmentData) => {
    console.log('Saving appointment:', appointmentData);
    setIsModalOpen(false);
    setSelectedAppointment(null);
  };

  const handleAppointmentDelete = (appointmentId) => {
    console.log('Deleting appointment:', appointmentId);
    setIsModalOpen(false);
    setSelectedAppointment(null);
  };

  const handleApproveAppointment = (appointmentId) => {
    console.log('Approving appointment:', appointmentId);
  };

  const handleRejectAppointment = (appointmentId) => {
    console.log('Rejecting appointment:', appointmentId);
  };

  const handleBulkAction = (action) => {
    console.log('Bulk action:', action);
  };

  const handleRefresh = () => {
    console.log('Refreshing calendar data...');
  };

  const handleLogout = () => {
    navigate('/login', { replace: true });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        userRole="practitioner"
        isAuthenticated={isAuthenticated}
        userName={userName}
        onLogout={handleLogout}
      />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="font-heading text-3xl font-bold text-foreground mb-2">
              Practitioner Calendar
            </h1>
            <p className="text-text-secondary font-body">
              Manage appointments, resources, and schedules for Ayurvedic therapy sessions
            </p>
          </div>

          {/* Quick Stats */}
          <QuickStats stats={stats} />

          {/* Calendar Header */}
          <CalendarHeader
            currentDate={currentDate}
            viewMode={viewMode}
            onViewChange={handleViewChange}
            onNavigate={handleDateNavigation}
            onTodayClick={handleTodayClick}
            onRefresh={handleRefresh}
          />

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Calendar Grid */}
            <div className="lg:col-span-3">
              <CalendarGrid
                viewMode={viewMode}
                currentDate={currentDate}
                appointments={appointments}
                resources={resources}
                onAppointmentClick={handleAppointmentClick}
                onAppointmentDrop={handleAppointmentDrop}
                onTimeSlotClick={handleTimeSlotClick}
              />
            </div>

            {/* Side Panel */}
            <div className="space-y-6">
              {/* Resource Panel */}
              <ResourcePanel
                resources={resources}
                selectedResources={selectedResources}
                onResourceToggle={handleResourceToggle}
              />

              {/* Pending Approvals */}
              <PendingApprovals
                pendingAppointments={pendingAppointments}
                onApprove={handleApproveAppointment}
                onReject={handleRejectAppointment}
                onBulkAction={handleBulkAction}
              />
            </div>
          </div>
        </div>
      </main>

      {/* Appointment Modal */}
      <AppointmentModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedAppointment(null);
        }}
        appointment={selectedAppointment}
        onSave={handleAppointmentSave}
        onDelete={handleAppointmentDelete}
        resources={resources}
      />
    </div>
  );
};

export default PractitionerCalendar;