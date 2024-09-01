

function DonerRegister() {
  const [doner, setDoner] = useState({
    Firstname: "",
    Lastname: "",
    NIC:"",
    Email: "",
    Phone: "",
    BloodGroup: "",
  });

  const handleChange = (e) => {
    setDoner({ ...doner, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(doner);
  };

  return (
    <div>
      <h1>Doner Register</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={doner.name}
          onChange={handleChange}
          placeholder="Name"
        />
        <input
          type="email"
          name="email"
          value={doner.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          value={doner.password}
          onChange={handleChange}
          placeholder="Password"
        />
        <input
          type="text"
          name="phone"
          value={doner.phone}
          onChange={handleChange}
          placeholder="Phone"
        />
        <input
          type="text"
          name="bloodGroup"
          value={doner.bloodGroup}
          onChange={handleChange}
          placeholder="Blood Group"
        />
        <input
          type="text"
          name="address"
          value={doner.address}
          onChange={handleChange}
          placeholder="Address"
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default DonerRegister;