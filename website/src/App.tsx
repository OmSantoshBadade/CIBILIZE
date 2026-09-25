import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ProtectedRoute } from "./components/auth/protected-route";
import { CcPayoffCalculator } from "./components/calculators/cc-payoff-calculator";
import { DebtCalculator } from "./components/calculators/debt-calculator";
import { EmergencyCalculator } from "./components/calculators/emergency-calculator";
import { EmiCalculator } from "./components/calculators/emi-calculator";
import { FdrdCalculator } from "./components/calculators/fdrd-calculator";
import { LumpsumCalculator } from "./components/calculators/lumpsum-calculator";
import { NetworthCalculator } from "./components/calculators/networth-calculator";
import { RetirementCalculator } from "./components/calculators/retirement-calculator";
import { SipCalculator } from "./components/calculators/sip-calculator";
import { TaxCalculator } from "./components/calculators/tax-calculator";
import { CreditCardLayoutProvider } from "./components/credit-card/credit-card-layout-provider";
import Layout from "./components/layout";
import { Hero } from "./components/marketing/hero";
import AdvancedCreditCardRecommendations from "./pages/advanced-credit-card";
import Agent from "./pages/agent";
import { AuthCallbackPage } from "./pages/auth-callback-page";
import EmiTracker from "./pages/calculator-page";
import CibilScoreTracker from "./pages/cibil-score-tracker";
import CreditCardPage from "./pages/credit-card";
import DatasetPage from "./pages/dataset-page";
import ExpenseTracker from "./pages/expense-tracker";
import Onboarding from "./pages/onboarding";
import { AuthProvider } from "./provider/auth-provider";
import { QueryProvider } from "./provider/query-provider";

function AppContent() {
  return (
    <div className="bg-background text-primary relative min-h-svh w-full overflow-hidden scroll-smooth antialiased">
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/auth/callback" element={<AuthCallbackPage />} />
        <Route path="/onboarding" element={<Onboarding />} />

        <Route
          path="/app/credit-cards"
          element={
            <ProtectedRoute requireAuth={true}>
              <Layout>
                <CreditCardPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/app/credit-cards/recommendations"
          element={
            <ProtectedRoute requireAuth={true}>
              <CreditCardLayoutProvider>
                <Layout>
                  <AdvancedCreditCardRecommendations />
                </Layout>
              </CreditCardLayoutProvider>
            </ProtectedRoute>
          }
        />

        <Route
          path="/agent"
          element={
            <ProtectedRoute requireAuth={true}>
              <QueryProvider>
                <Layout className="overflow-hidden">
                  <Agent />
                </Layout>
              </QueryProvider>
            </ProtectedRoute>
          }
        />

        <Route
          path="/app/cibil-score-tracker"
          element={
            <ProtectedRoute requireAuth={true}>
              <Layout>
                <CibilScoreTracker />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/app/expense-tracker"
          element={
            <ProtectedRoute requireAuth={true}>
              <Layout>
                <ExpenseTracker />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/data-set"
          element={
            <ProtectedRoute requireAuth={true}>
              <Layout>
                <DatasetPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/app/calculator"
          element={
            <ProtectedRoute requireAuth={true}>
              <Layout>
                <EmiTracker />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Calculator Routes */}
        <Route
          path="/app/calculator/emi-calculator"
          element={
            <ProtectedRoute requireAuth={true}>
              <Layout>
                <EmiCalculator />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/app/calculator/sip-calculator"
          element={
            <ProtectedRoute requireAuth={true}>
              <Layout>
                <SipCalculator />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/app/calculator/lumpsum-calculator"
          element={
            <ProtectedRoute requireAuth={true}>
              <Layout>
                <LumpsumCalculator />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/app/calculator/tax-calculator"
          element={
            <ProtectedRoute requireAuth={true}>
              <Layout>
                <TaxCalculator />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/app/calculator/retirement-calculator"
          element={
            <ProtectedRoute requireAuth={true}>
              <Layout>
                <RetirementCalculator />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/app/calculator/emergency-calculator"
          element={
            <ProtectedRoute requireAuth={true}>
              <Layout>
                <EmergencyCalculator />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/app/calculator/networth-calculator"
          element={
            <ProtectedRoute requireAuth={true}>
              <Layout>
                <NetworthCalculator />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/app/calculator/cc-payoff-calculator"
          element={
            <ProtectedRoute requireAuth={true}>
              <Layout>
                <CcPayoffCalculator />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/app/calculator/fdrd-calculator"
          element={
            <ProtectedRoute requireAuth={true}>
              <Layout>
                <FdrdCalculator />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/app/calculator/debt-calculator"
          element={
            <ProtectedRoute requireAuth={true}>
              <Layout>
                <DebtCalculator />
              </Layout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;
