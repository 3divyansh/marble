import React, { useState, useEffect } from 'react';
import { Button, Alert, Spinner } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";

const User = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Sample contact form data
  const sampleContacts = [
    {
      id: 1,
      name: "Rahul Kumar",
      email: "rahul.kumar@gmail.com",
      phone: "+91 9876543210",
      query: "I want to know about guitar lessons. Do you provide online classes?"
    },
    {
      id: 2,
      name: "Priya Sharma",
      email: "priya.sharma@yahoo.com",
      phone: "+91 8765432109",
      query: "What are the fees for piano classes? Also, do you have weekend batches?"
    },
    {
      id: 3,
      name: "Amit Singh",
      email: "amit.singh@hotmail.com",
      phone: "+91 7654321098",
      query: "I'm interested in vocal training. Can you share the course details and duration?"
    },
    {
      id: 4,
      name: "Sneha Patel",
      email: "sneha.patel@gmail.com",
      phone: "+91 6543210987",
      query: "Do you have drums classes for beginners? What instruments do you provide?"
    },
    {
      id: 5,
      name: "Vikash Gupta",
      email: "vikash.gupta@outlook.com",
      phone: "+91 5432109876",
      query: "I want to learn keyboard. Is there any trial class available?"
    }
  ];

  // Simulate loading and fetch data
  useEffect(() => {
    const timer = setTimeout(() => {
      setContacts(sampleContacts);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Function to refresh data
  const refreshData = () => {
    setLoading(true);
    setError('');
    setTimeout(() => {
      setContacts(sampleContacts);
      setLoading(false);
    }, 500);
  };

  return (
    <div className="container-fluid px-2 px-md-3">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-2">
        <h5 className="mb-2 mb-md-0 d-none d-md-block">Contact Form Submissions</h5>
        <div className="w-100 w-md-auto text-end">
          <Button 
            variant="outline-primary" 
            size="sm" 
            onClick={refreshData} 
            disabled={loading}
            className="w-100 w-md-auto"
          >
            {loading ? <Spinner animation="border" size="sm" /> : 'Refresh'}
          </Button>
        </div>
      </div>

      {error && (
        <Alert variant="danger" className="mt-2">
          {error}
        </Alert>
      )}

      {loading ? (
        <div className="text-center py-4">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          <p className="mt-2 small">Loading contact submissions...</p>
        </div>
      ) : contacts.length === 0 ? (
        <Alert variant="info" className="mt-2">
          No contact submissions found.
        </Alert>
      ) : (
        <>
          {/* Mobile Cards View */}
          <div className="d-block d-md-none mt-5">
            {contacts.map((contact) => (
              <div key={contact.id} className="card mb-3 shadow-sm">
                <div className="card-body p-3">
                  <div className="row">
                    <div className="col-12 mb-2">
                      <strong className="text-dark">{contact.name}</strong>
                    </div>
                    <div className="col-12 mb-2">
                      <small className="text-muted">Email:</small><br />
                      <span className="text-primary fw-bold">{contact.email}</span>
                    </div>
                    <div className="col-12 mb-2">
                      <small className="text-muted">Phone:</small><br />
                      <span className="text-dark">{contact.phone}</span>
                    </div>
                    <div className="col-12 mb-2">
                      <small className="text-muted">Query:</small><br />
                      <span className="text-secondary small">{contact.query}</span>
                    </div>
                    <div className="col-12">
                      <div className="d-flex gap-2">
                        <button className="btn btn-sm btn-outline-success flex-fill fw-bold">Edit</button>
                        <button className="btn btn-sm btn-outline-danger flex-fill fw-bold">Delete</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Table View */}
          <div className="table-responsive mt-3 d-none d-md-block">
            <table className="table table-hover">
              <thead className="table-dark">
                <tr>
                  <th style={{ minWidth: '150px' }}>Name</th>
                  <th style={{ minWidth: '200px' }}>Email</th>
                  <th style={{ minWidth: '130px' }}>Phone</th>
                  <th style={{ minWidth: '300px' }}>Query</th>
                  <th style={{ minWidth: '140px' }}>Action</th>
                </tr>
              </thead>
              <tbody className="fw-bold">
                {contacts.map((contact) => (
                  <tr key={contact.id}>
                    <td>{contact.name}</td>
                    <td className="text-primary">{contact.email}</td>
                    <td>{contact.phone}</td>
                    <td>
                      <div className="text-secondary" style={{ maxWidth: '300px' }}>
                        <small>{contact.query}</small>
                      </div>
                    </td>
                    <td>
                      <span className="btn btn-sm text-success me-2 fw-bold">Edit</span>
                      <span className="btn btn-sm text-danger fw-bold">Delete</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {contacts.length > 0 && (
        <div className="mt-3 d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center">
          <small className="text-muted mb-2 mb-md-0">
            Total Submissions: <strong>{contacts.length}</strong>
          </small>
          <small className="text-muted">
            Last updated: {new Date().toLocaleTimeString()}
          </small>
        </div>
      )}
    </div>
  );
};

export default User;