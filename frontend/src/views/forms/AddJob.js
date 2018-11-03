import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class AddJob extends Component {
  render() {
    return (
      <section>
        <h2>Job Management - Add Job</h2>
        <form>
          <div>
            <label>Job No.:
              <div>
                <input type="number" />
              </div>
            </label>
          </div>
          <div>
            <label>Train ID:
              <div>
                <input type="number" />
              </div>
            </label>
          </div>
          <div>
            <label>Engineer:
              <div>
                <select>
                  <option value="">Engineer Name</option>
                </select>
              </div>
            </label>
          </div>
          <div>
            <label>Conductor:
               <div>
                <select>
                  <option value="">Conductor Name</option>
                </select>
              </div>
            </label>
          </div>
          <div>
            <label>Assistant Conductor:
              <div>
                <select>
                  <option value="">Assistant Conductor Name</option>
                </select>
              </div>
            </label>
          </div>
          <div>
            <label>Start Station:
              <div>
                <select>
                  <option value="">Start Station Name</option>
                </select>
              </div>
            </label>
          </div>
          <div>
            <label>End Station:
              <div>
                <select>
                  <option value="">End Station Name</option>
                </select>
              </div>
            </label>
          </div>
          <div>
            <label>Signup Time:
              <div>
                <input type="time" />
              </div>
            </label>
          </div>
          <div>
            <label>Signoff Time:
              <div>
                <input type="time"/>
              </div>
            </label>
          </div>
          <div>
            <button>Submit</button>
            <Link to="/jobs">Cancel</Link>
          </div>
        </form>
      </section>
    );
  }
}

export default AddJob;