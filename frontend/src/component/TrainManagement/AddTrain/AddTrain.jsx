import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class AddTrain extends Component {
  render() {
    return (
      <section>
        <h2>Add Train</h2>
        <form>
          <div>
            <label>Train (Engine) ID:
              <div>
                <input type="number" />
              </div>
            </label>
          </div>
          <div>
            <label>Name:
              <div>
                <input type="text" />
              </div>
            </label>
          </div>
          <div>
            <label>Make:
              <div>
                <input type="text" />
              </div>
            </label>
          </div>
          <div>
            <label>Model:
              <div>
                <input type="text" />
              </div>
            </label>
          </div>
          <div>
            <button>Submit</button>
            <Link to="/trains">Cancel</Link>
          </div>
        </form>
      </section>
    );
  }
}

export default AddTrain;