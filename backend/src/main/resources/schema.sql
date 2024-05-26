CREATE TABLE IF NOT EXISTS Filter (
    id INT NOT NULL,
    title varchar(250) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS Criteria (
    id INT NOT NULL,
    filterID INT NOT NULL,
    criteria varchar(250) NOT NULL,
    comparingCondition varchar(250) NOT NULL,
    conditionValue varchar(250) NOT NULL,
    PRIMARY KEY (id)
);