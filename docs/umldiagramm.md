```mermaid
sequenceDiagram
    participant User
    participant Frontend (React App)
    participant Backend API
    participant Database

    User->>Frontend (React App): Opens App
    Frontend (React App)->>User: Shows Login Screen

    User->>Frontend (React App): Enters Credentials and Clicks Login
    Frontend (React App)->>Backend API: POST /api/auth/login (email, password)
    Backend API->>Database: Query User by email
    alt Database accessible
        Database-->>Backend API: Returns User record
        alt Successful Login & Password Match
            Backend API-->>Frontend (React App): Returns JWT Token and User Info
            Frontend (React App)->>User: Navigates to Dashboard
        else Invalid Credentials
            Backend API-->>Frontend (React App): Returns 401 Unauthorized
            Frontend (React App)->>User: Shows "Invalid credentials"
        end
    else Database error
        Backend API-->>Frontend (React App): Returns 500 Server Error
        Frontend (React App)->>User: Shows "Server error, please try again later"
    end

    User->>Frontend (React App): Clicks on 'Matches' Tab
    Frontend (React App)->>Backend API: GET /api/matches
    Backend API->>Database: Query all matches
    Database-->>Backend API: Returns match records
    Backend API-->>Frontend (React App): Returns List of Matches
    Frontend (React App)->>User: Shows Match List Screen

    User->>Frontend (React App): Clicks on a 'Live' Match
    Frontend (React App)->>Backend API: GET /api/matches/{matchId}
    Backend API->>Database: Query match by ID
    alt Match found
        Database-->>Backend API: Returns match record
        Backend API-->>Frontend (React App): Returns Match Details (including game mode like 501, 301)
    else Not Found
        Database-->>Backend API: Returns null/empty
        Backend API-->>Frontend (React App): Returns 404 Not Found
        Frontend (React App)->>User: Shows "Match not found" error
    end
    Frontend (React App)->>User: Navigates to Live Scoring Screen, initialized with correct starting score

    %% Team Management
    User->>Frontend (React App): Clicks on 'Teams' Tab
    Frontend (React App)->>Backend API: GET /api/teams
    Backend API->>Database: Query all teams
    alt Teams found
        Database-->>Backend API: Returns team records
        Backend API-->>Frontend (React App): Returns List of Teams
    else No teams found or DB error
        Backend API-->>Frontend (React App): Returns empty list or error
    end
    Frontend (React App)->>User: Shows Team List Screen

    User->>Frontend (React App): Clicks 'Add Team'
    User->>Frontend (React App): Fills in team details and submits
    Frontend (React App)->>Backend API: POST /api/teams (team data)
    Backend API->>Database: Insert new team record
    Database-->>Backend API: Confirms insertion
    Backend API-->>Frontend (React App): Confirms team creation
    Frontend (React App)->>User: Shows updated team list

    User->>Frontend (React App): Clicks on a Team
    Frontend (React App)->>Backend API: GET /api/teams/{teamId}/members
    Backend API->>Database: Query members by team ID
    alt Team and members found
        Database-->>Backend API: Returns member records
        Backend API-->>Frontend (React App): Returns list of team members
    else Team not found
        Backend API-->>Frontend (React App): Returns 404 Not Found
    end
    Frontend (React App)->>User: Shows team members screen

    %% Live Scoring
    User->>Frontend (React App): Enters score for three darts
    Frontend (React App)->>Backend API: POST /api/scoring/throw (matchId, playerId, darts)
    alt Valid Score Input
        Backend API->>Database: Save throw and update scores
        alt Database write successful
            Database-->>Backend API: Confirms update
            alt Throw is valid (not a bust, leg not won)
                Backend API-->>Frontend (React App): Returns updated scores, stats, and next player
                Frontend (React App)->>User: Updates scoreboard and switches to next player
            else Bust
                Backend API-->>Frontend (React App): Returns bust status and next player
                Frontend (React App)->>User: Shows "Bust!" message and switches player
            else Leg won
                Backend API-->>Frontend (React App): Returns leg winner and updated leg/set score
                Frontend (React App)->>User: Shows leg winner, starts new leg or shows set winner
            else Match won
                Backend API-->>Frontend (React App): Returns match winner
                Frontend (React App)->>User: Shows match winner and navigates to match summary
            end
        else Database write failed
            Backend API-->>Frontend (React App): Returns 500 Server Error
            Frontend (React App)->>User: Shows "Failed to save score" error
        end
    else Invalid Score Input
        Backend API-->>Frontend (ReactApp): Returns 400 Bad Request
        Frontend (ReactApp)->>User: Shows "Invalid score" message
    end

    User->>Frontend (React App): Clicks 'Logout'
    Frontend (React App)->>Backend API: POST /api/auth/logout
    Backend API-->>Frontend (React App): Confirms Logout
    Frontend (React App)->>User: Navigates to Login Screen