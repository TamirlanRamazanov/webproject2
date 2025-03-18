import React from 'react';

const SwapiServiceContext = React.createContext();

export const {
  Provider: SwapiServiceProvider,
  Consumer: SwapiServiceConsumer
} = SwapiServiceContext;

export default SwapiServiceContext;