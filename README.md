Checkpoint 0
    1. The index is acting as the main screen now
    2. PokemonName is the state which controls the input value and is used when getting the pokemon

Checkpoint 1
    1. the response will have an error that we will need to manually handle
    2. we dont assume because the api may return the wrong thing like missing data

Checkpoint 2
    1. app truth determines the apps behavior, this is found in the index file
    2. The search will stay loading

Checkpoint 3
    1. Rendering a shaped object is organized and consistant, unlike raw JSON
    2. The styles are responsible for UI, fetching is responsible for logic.

Checkpoint 4
    1. Index is responsible for:
        1. input
        2. fetching
        3. display
    2. I would fetch from a separate file and access it from that file 
    3. Look over the code to ensure parsing isint isolated, and I would make sure the program runs
    normally

Checkpoint 5
    1. Its a win because noe its reusable since its independant
    2. The function takes a name input then displays a pokemon as the output. If theres an error 
    somewhere in between then pokemon is not found. 

Checkpoint 6
    1. A model gives a structure for data
    2. its safer due to the structure, allowing for consistancy

Checkpoint 7
    1. A builder pattern allows for a clean sonsistant structure when loading pokemon
    2. A model can be safer due to its consistancy, JSON lacks this

Checkpoint 8
    1. The controller validates the input and then calls and loads the pokemon. 
    2. The view should only focus on UI

Checkpoint 9
    1. It needs input value, input change, search action, and the displayed state
    2. It would mix UI and business logic, making the view harder to reuse

Checkpoint 10
    1. Favorites are in controller since its an app state, not part of ui
    2. Derived state means that it can be calculated from favs

Checkpoint 11
    1. Its implemented this way because its differerant that state/ui and should be its own reusable item. 
    2. Persistted state remains afer an app refresh, regular state doesnt do this

Checkpoint 12
    1. Animations are a part of UI so they should be handled in the view 
    2. The animation is triggered in useEffect when pokemon changes, because that indicates new results were loaded and should animate in.