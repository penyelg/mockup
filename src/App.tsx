/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { DemoRoleBar } from './components/common/DemoRoleBar';
import { ToastContainer } from './components/common/ToastContainer';
import { PatientAppContainer } from './components/patient/PatientAppContainer';
import { ClinicDashboardContainer } from './components/clinic/ClinicDashboardContainer';
import { AdminDashboardContainer } from './components/admin/AdminDashboardContainer';

const AppContent: React.FC = () => {
  const { currentRole } = useApp();

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col text-slate-800">
      {/* Demo Role Selector & Reviewer Controls Toolbar */}
      <DemoRoleBar />

      {/* Role-Based Active View */}
      <div className="flex-1">
        {currentRole === 'patient' && <PatientAppContainer />}
        {currentRole === 'clinic_rep' && <ClinicDashboardContainer />}
        {currentRole === 'admin' && <AdminDashboardContainer />}
      </div>

      {/* System Toast Notifications */}
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
