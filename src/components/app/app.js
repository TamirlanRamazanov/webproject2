import React, {Component} from 'react'

import Header from '../header'
import RandomPlanet from '../random-planet'

import './app.css'
import ErrorIndicator from "../error-indicator";
import PeoplePage from "../people-page";
import SwapiService from "../../services/swapi-service"
import { PersonDetails } from "../sw-components";
import { PersonList, PlanetList, StarshipList } from "../sw-components/item-lists";
import ErrorBoundary from "../error-boundary";
import { SwapiServiceProvider } from '../swapi-service-context';
import Row from '../row';


export default class App extends Component {

    swapiService = new SwapiService()

    state = {
        selectedPerson: null,
        hasError: false
    }

    componentDidCatch(error, errorInfo) {
        this.setState({ hasError: true })
    }

    onPersonSelected = (id) => {
        console.log("Selected person ID:", id);
        this.setState({ selectedPerson: id });
    };

    render() {

        if (this.state.hasError) {
            return <ErrorIndicator />
        }

        const personList = (
            <PersonList onItemSelected={this.onPersonSelected}>
                { i => `${i.name} (${i.birthYear})` }
            </PersonList>
        );

        const personDetails = (
            <PersonDetails itemId={this.state.selectedPerson} />
        );

        return (
            <ErrorBoundary>
                <SwapiServiceProvider value={this.swapiService}>
                    <div className="stardb-app">
                        <Header/>
                        <RandomPlanet />

                        <Row left={personList} right={personDetails} />

                        <StarshipList>
                            { i => `${i.name} (${i.cargoCapacity})` }
                        </StarshipList>

                        <PlanetList>
                            { i => `${i.name} (${i.population})` }
                        </PlanetList>
                    </div>
                </SwapiServiceProvider>
            </ErrorBoundary>
        )
    }
}
