import React from 'react';

const CertificationManagement = () => {
  return (
    <section>
      <h2>Certification Management</h2>
      <div>
        <form>
          <label>Add Certification:&nbsp;
            <input type="text" placeholder="Certification Name"/>
            <input type="submit" value="Submit" />
          </label>
        </form>
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Sample Certification</td>
            <td><button>Delete</button></td>
          </tr>
        </tbody>
      </table>
    </section>
  );
};

export default CertificationManagement;