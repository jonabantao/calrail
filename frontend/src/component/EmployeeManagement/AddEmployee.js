import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class AddEmployee extends Component {
  render() {
    return (
      <section>
        <h2>Add Employee</h2>
        <form>
          <div>
            <label>First Name:
              <div>
                <input type="text" />
              </div>
            </label>
          </div>
          <div>
            <label>Last Name:
              <div>
                <input type="text" />
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
            <label>Start Date:
              <div>
                <input type="date" name="" id=""/>
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

export default AddEmployee;