import React from 'react';

const TerminalManagement = () => {
  return (
    <section>
      <h2>Terminal Management</h2>
      <div>
        <form>
          <label>Add Terminal:&nbsp;
            <input type="text" placeholder="Terminal Name" />
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
            <td>Sample Station</td>
            <td><button>Delete</button></td>
          </tr>
        </tbody>
      </table>
    </section>
  );
};

export default TerminalManagement;