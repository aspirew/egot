import express, { Router } from 'express'
import badgeService from './services/badgeService';
import wayService from './services/wayService'
import userService from './services/userService'

const router = Router()

router.get('/', (req, res) => {
    res.send('Hello world!');
  })

router.get('/api/ways', (req, res) => wayService.getAllWays(req, res))


router.get('/api/ongoingBadge', (req, res) => badgeService.getOngoingBadge(req, res))
router.get('/api/completedBadges', (req, res) => badgeService.getCompletedBadges(req, res))
router.get('/api/badge/:type', (req, res) => badgeService.getBadge(req, res))
router.get('/api/rank/:id', (req, res) => badgeService.getRankById(req, res))

router.get('/api/loginUser', (req, res) => userService.logUserIn(req, res))
router.get('/api/loginEmployee', (req, res) => userService.logEmployeeIn(req, res))
router.get('/api/getLoggedInData', (req, res) => userService.loggedInData(req, res))

export default router