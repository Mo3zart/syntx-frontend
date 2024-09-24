import React, { useState } from 'react';
import { TextField, Button, Typography, Grid, Avatar, IconButton, InputAdornment } from '@mui/material';
import { PhotoCamera, Edit as EditIcon, Lock as LockIcon, Save as SaveIcon } from '@mui/icons-material';
import './UserProfilePage.css';

const UserProfilePage: React.FC = () => {
    const [username, setUsername] = useState<string>('Moe');
    const [email, setEmail] = useState<string>('email@example.com');
    const [isEditingUsername, setIsEditingUsername] = useState<boolean>(false);
    const [isEditingEmail, setIsEditingEmail] = useState<boolean>(false);
    const [showPasswordFields, setShowPasswordFields] = useState<boolean>(false);
    const [profilePic, setProfilePic] = useState<File | null>(null);

    const handleProfilePicChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setProfilePic(event.target.files[0]);
        }
    };

    const handleEditUsername = () => setIsEditingUsername(true);
    const handleEditEmail = () => setIsEditingEmail(true);
    const handleShowPasswordFields = () => setShowPasswordFields(!showPasswordFields);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Handle profile update logic here
    };

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                paddingTop: '4rem',
            }}
        >
            <Typography variant="h5" align="center" sx={{ mb: 4 }}>
                Update Your Profile
            </Typography>

            <form
                onSubmit={handleSubmit}
                style={{
                    width: '100%',
                    maxWidth: '800px', // Ensures it doesn't exceed 800px, aligned to "Syntx" and profile icon
                    padding: '0 2rem', // Adjust padding for alignment
                }}
            >
                <Grid container spacing={2} alignItems="center" justifyContent="center">
                    {/* Username Field */}
                    <Grid item xs={12} sm={5}>
                        <TextField
                            label="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            fullWidth
                            InputProps={{
                                readOnly: !isEditingUsername,
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={handleEditUsername}>
                                            <EditIcon />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>

                    {/* Email Field */}
                    <Grid item xs={12} sm={5}>
                        <TextField
                            label="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            fullWidth
                            InputProps={{
                                readOnly: !isEditingEmail,
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={handleEditEmail}>
                                            <EditIcon />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>

                    {/* Profile Picture on the top right */}
                    <Grid item xs={12} sm={2} style={{ textAlign: 'right' }}>
                        <Avatar
                            sx={{ width: 100, height: 100 }}
                            src={profilePic ? URL.createObjectURL(profilePic) : undefined}
                        />
                        <IconButton color="primary" aria-label="upload picture" component="label">
                            <input hidden accept="image/*" type="file" onChange={handleProfilePicChange} />
                            <PhotoCamera />
                        </IconButton>
                    </Grid>

                    {/* Toggle Password Fields */}
                    <Grid item xs={12} style={{ textAlign: 'center' }}>
                        <Button
                            variant="outlined"
                            startIcon={<LockIcon />}
                            onClick={handleShowPasswordFields}
                        >
                            Change Password
                        </Button>
                    </Grid>

                    {/* Password Fields (Hidden by default) */}
                    {showPasswordFields && (
                        <>
                            <Grid item xs={12} sm={5}>
                                <TextField
                                    label="New Password"
                                    type="password"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={5}>
                                <TextField
                                    label="Confirm New Password"
                                    type="password"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} style={{ textAlign: 'center' }}>
                                <Button variant="outlined" startIcon={<SaveIcon />} type="submit">
                                    Save Password
                                </Button>
                            </Grid>
                        </>
                    )}

                    {/* Submit Button */}
                    <Grid item xs={12} style={{ textAlign: 'center', marginTop: '1rem' }}>
                        <Button type="submit" fullWidth variant="contained">
                            Update Profile
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
};

export default UserProfilePage;
