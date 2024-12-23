import React from 'react';

const AdminFooter = () => {
    return (
        <footer className="bg-green-600 text-white p-4 mt-6">
          <div className="text-center">
            <p>&copy; {new Date().getFullYear()} Rem Farms. All rights reserved.</p>
            <p>
              <a href="/privacy-policy" className="text-white underline">Privacy Policy</a> | 
              <a href="/terms-of-service" className="text-white underline"> Terms of Service</a>
            </p>
          </div>
        </footer>
      );
    };
    
    export default AdminFooter;