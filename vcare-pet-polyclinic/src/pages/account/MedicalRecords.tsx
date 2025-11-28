import { Link } from 'react-router-dom';

export default function MedicalRecords() {
  return (
    <div className="min-h-screen py-20 bg-gray-50">
      <div className="container-custom">
        <h1 className="text-5xl font-bold text-text-primary mb-8">MedicalRecords</h1>
        <p className="text-xl text-text-secondary mb-8">
          This page is under construction. Please check back soon.
        </p>
        <Link to="/" className="btn-primary">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
