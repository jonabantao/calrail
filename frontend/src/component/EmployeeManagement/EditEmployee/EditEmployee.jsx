import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class EditEmployee extends Component {
  render() {
    return (
      <section>
        <h2>Edit Employee</h2>
        <form>
          <div>
            <label>First Name:
              <div>
                <input type="text" defaultValue="John" />
              </div>
            </label>
          </div>
          <div>
            <label>Last Name:
              <div>
                <input type="text" defaultValue="Doe"/>
              </div>
            </label>
          </div>
          <div>
            <label>Home Base:
               <div>
                <select>
                  <option value="">List of Terminals</option>
                </select>
              </div>
            </label>
          </div>
          <div>
            <button>Submit</button>
            <Link to="/employees">Cancel</Link>
          </div>
        </form>
      </section>
    );
  }
}

export default EditEmployee;