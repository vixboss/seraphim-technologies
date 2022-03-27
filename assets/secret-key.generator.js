const randomKeyGenerator = () => {
    return (Math.random() + 1).toString(36).substring(5);
}

module.exports = randomKeyGenerator;