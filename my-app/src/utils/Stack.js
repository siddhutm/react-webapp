function Stack(list) {
    this.items = list || [];
    this.push = (item) => {
        this.items.push(item)
    }
    this.pop = () => {
        this.items.pop();
    }
    this.getTop = () => {
        const length = this.items.length;
        if(length) {
            return this.items[ length -1 ]
        }

        return null;
    }

    this.isEmpty = () => {
        return this.items.length === 0;
    }
}

export default Stack;