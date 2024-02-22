import React, { useState } from 'react';
import axios from 'axios';
import {Button, List, ListItem, ListItemText, TextField} from "@mui/material";

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [data, setData] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('https://jwt.sulla.hu/login', {
        username,
        password,
      });
      setToken(response.data.token);
    } catch (error) {
      console.error('Hitelesítés sikertelen:', error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get('https://jwt.sulla.hu/termekek', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(response.data);
    } catch (error) {
      console.error('Adatok lekérése sikertelen:', error);
    }
  };

  return (
      <div style={{textAlign:"center"}}>
        <h1>Bejelentkezés</h1>
        <form>
          <TextField
              label="Felhasználónév"
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
          />
          <br/>
          <br/>
          <TextField
              label="Jelszó"
              variant="outlined"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
          />
          <br/>
          <br/>
          <Button variant="contained" color="primary" onClick={handleLogin}>
            Bejelentkezés
          </Button>
        </form>
        {token && (
            <div>
              <h2>Védett végpont</h2>
              <Button variant="contained" color="primary" onClick={fetchData}>
                Végpont lekerdezés
              </Button>
              {data && (
                  <List>
                    {data.map((item) => (
                        <ListItem key={item.id}>
                          <ListItemText primary={item.name} secondary={item.price} />
                        </ListItem>
                    ))}
                  </List>
              )}
            </div>
        )}
      </div>
  );
}

export default App;
