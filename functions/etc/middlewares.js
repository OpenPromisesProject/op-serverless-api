const admin = require('firebase-admin');
const _ = require('lodash');
const contributorModel = require('../models/contributor');
const contributors = contributorModel();

const firebaseAuth = function(req, res, next) {
  const sentToken = req.headers['x-firebase-token'];
  const email = req.headers['x-user-email'];
  const name = req.headers['x-user-name'];
  const profile_image = req.headers['x-user-photo'];

  const user = {
    email,
    name,
    profile_image
  };
  console.log({ user });
  if (!sentToken) {
    res.status(400);
    res.send('You need to be authorized to do this.');
  } else {
    admin
      .auth()
      .verifyIdToken(sentToken)
      .then(decodedToken => {
        // TODO: simplify below
        contributors
          .find({ email })
          .then(contributor => {
            // if no contributor, create
            if (_.isEmpty(contributor)) {
              return contributors.createSchema.validate(
                user,
                (err, validatedData) => {
                  console.log({ validatedData });
                  if (err) return res.status(400).send(err.message);

                  return contributors
                    .add(validatedData)
                    .then(result => {
                      console.log({ result });
                      req.params.contributor_id = result.id;
                      return next();
                    })
                    .catch(e => {
                      console.log(e);
                      return res.status(500).end();
                    });
                }
              );
            } else {
              // when contributor already exists, attach contributor_id
              console.log(contributor, contributor.id);
              req.params.contributor_id = contributor.id; // check that
              return next();
            }
          })
          .catch(e => {
            console.log(e);
            res.status(500).end();
          });

        var uid = decodedToken.uid; // TODO: remove this if unused
        return uid;
      })
      .catch(error => {
        console.log(error);
        res.status(400);
        res.send('There has been an error in authorization.');
      });
  }
};

module.exports = {
  firebaseAuth
};
