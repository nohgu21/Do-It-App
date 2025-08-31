import { useState, useEffect } from 'react';

const Greeting: React.FC = () => {
  console.log("Say hello to the user...");
  const [greeting, setGreeting] = useState<string>('');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning ☀️');
    else if (hour < 17) setGreeting('Good Afternoon 🌤️');
    else setGreeting('Good Evening 🌙');
  }, []);

  return <h1 className="text-2xl font-bold">{greeting}</h1>;
};

export default Greeting;